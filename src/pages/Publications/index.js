import { Elasticsearch, Facet, Results, SearchBox } from 'react-elasticsearch';
import { Card, CardDescription, CardDetail, CardTitle } from '@dataesr/react-dsfr';

import './index.css'

const MyCardItem = (props) => {
    return (
        <Card key={props.key} href={"publication/" + props.source.doi}>
            <CardDetail>{props.source.year}</CardDetail>
            <CardTitle>{props.source.title}</CardTitle>
            <CardDescription>{props.source.journal_name}</CardDescription>
        </Card>
    )
}

const Publications = () => {
    return (
        <Elasticsearch url="http://localhost:9200/scanr-backoffice">
            <Facet
                id="detected_countries"
                fields={['detected_countries.keyword']}
            />
            <SearchBox id="mainSearch" fields={["title"]}/>
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
