# piti
`piti` is a state diff tool for dbt 


# Getting Started

1. Installation

   ```
   git clone git@github.com:InfuseAI/piti.git
   cd piti
   pip install -e .
   ```

2. Prepare the base state. The [schema](https://docs.getdbt.com/docs/core/connect-data-platform/connection-profiles#understanding-target-schemas) should not be the same as the current developing one.

    ```
    jaffle_shop:
      target: dev
      outputs:
        dev:
          type: duckdb
          path: jaffle_shop.duckdb
          schema: main
        base:
          type: duckdb
          path: jaffle_shop.duckdb
          schema: base
    ```

    Run the base state with different [target-path](https://docs.getdbt.com/reference/project-configs/target-path). `piti` uses `target-base/` to find your base state by default

    ```
    dbt run --target base --target-path target-base/
    ```

3. Develop your awesome feature
    ```
    dbt run
    ```

4. Compare the model you want to diff
    ```
    piti diff orders
    ```

# Usage
## Diff
Diff a resource from base state.

1. Diff a model.
   ```
   piti diff orders
   ```
1. Diff a resource with other methods. Preview is to query the top 100 rows in the table
   ```
   piti diff orders preview
   ```   
1. Diff a [analysis](https://docs.getdbt.com/docs/build/analyses), which is a source-controlled analytical sql.
    ```
   piti diff top_10_products_last_week
   ```
1. Diff with adhoc query
   ```
   piti diff --sql 'select date_week, sum(amounts) as revenue from {{ ref("orders") }} group by 1'
   ```

   Please place the index column as the first column in your query. We will treat the data in this column as the same record during the diff. In the future, we will support allowing users to specify the index column.


## Lineage Diff
Upload the manifests to piperider cloud and see the lineage diff

```
piti lineagediff
```


## Analyze

Analyze the critical impacts you care in your project. (e.g. revenue, order count). It allows you to assess if the change is expected.
   
```
piti analyze
```

You should put the impact definition in the `impacts.yml`

```
impacts:
- name: 'order'
  resource_name: 'orders'
- name: 'order_preview'
  resource_name: 'orders'
  method: 'preview'  
- name: 'order_count'
  resource_name: 'impact_order_count'
- name: 'revenue'
  resource_name: 'impact_revenue'
```

# Q&A

### Q: How `piti` connect to my data warehouse? Does piti support my data warehouse?

`piti` use the [dbt adapter](https://docs.getdbt.com/docs/connect-adapters) to connect to your warehouse. So it should work for your data warehouse.

### Q: What credential does `piti` connect to the two schemas?

It uses the same target. If you use the default target `dev`, it use the credentials to connect to both schemas. So the credential should have the permission to both schemas.


