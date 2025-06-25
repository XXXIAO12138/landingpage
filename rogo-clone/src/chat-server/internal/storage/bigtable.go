package storage

import (
    "cloud.google.com/go/bigtable"
    "context"
    "fmt"
    "log"
    "os"
)

var table *bigtable.Table

func init() {
    proj := os.Getenv("BIGTABLE_PROJECT")
    inst := os.Getenv("BIGTABLE_INSTANCE")
    if proj == "" || inst == "" {
        log.Println("[storage] Bigtable 未配置，使用内存 stub")
        return
    }
    client, err := bigtable.NewClient(context.Background(), proj, inst)
    if err != nil {
        panic(err)
    }
    table = client.Open("chat_messages")
}

func rk(session int64) string { return fmt.Sprintf("session/%d", session) }

func Put(ctx context.Context, s int64, role, content string) {
    if table == nil {
        return
    }
    mut := bigtable.NewMutation()
    mut.Set("msg", role, bigtable.Now(), []byte(content))
    _ = table.Apply(ctx, rk(s), mut)
}

func ScanKeys(ctx context.Context) ([]string, error) {
    if table == nil {
        return []string{}, nil
    }
    keys := []string{}
    err := table.ReadRows(ctx, bigtable.InfiniteRange("session/"),
        func(r bigtable.Row) bool {
            keys = append(keys, r.Key()); return true
        },
        bigtable.RowFilter(bigtable.CellsPerRowLimitFilter(1)),
    )
    return keys, err
}
