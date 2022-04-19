import { Elasticsearch, QueryBuilder, Results } from 'react-elasticsearch';
import { Card, CardDescription, CardDetail, CardTitle } from '@dataesr/react-dsfr';

const MyCardItem = (props) => {
    return (
        <Card key={props.key} href="/">
            <CardDetail>{props.source.year}</CardDetail>
            <CardTitle>{props.source.title}</CardTitle>
            <CardDescription>{props.source.journal_name}</CardDescription>
        </Card>
    )
}

const Publications = () => {
    return (
        <Elasticsearch url="http://localhost:9200/scanr-backoffice">
            {/* <QueryBuilder
                id="query_builder"
                fields={[
                    { value: "title.keyword", text: "Title" }
                ]}
            /> */}
            <Results
                id="results"
                items={data =>
                    data.map(item => <MyCardItem key={item._id} source={item._source} />)
                }
                stats={total => <div>{total} publications</div>}
            />
        </Elasticsearch>
    )
}

export default Publications;
