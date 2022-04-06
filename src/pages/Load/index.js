import { useEffect, useState } from 'react';
import jsonl from '../../data/test-scanr_export_internal.jsonl'
import { ES_INDEX_NAME, getEsClient } from '../../utils';

const Load = () => {
    const [isLoading, setIsLoading] = useState(0);

    const getData = async () => {
        // Create index with mapping if it does not exist
        const client = getEsClient();
        client.indices.delete({ index: ES_INDEX_NAME, ignore_unavailable: true });
        const mappings = {
        properties: {
            oa_details: {
                type: 'nested',
                properties: {
                    '2021Q4': {
                    type: 'nested',
                    properties: {
                        oa_locations: {
                        type: 'nested',
                        properties: {
                            oa_date: {
                            type: 'text'
                            }
                        }
                        }
                    }
                    }
                }
            },
            classifications: {
                type: 'nested',
                properties: {
                    code: {
                    type: 'text'
                    }
                }
            }
        }
        };
        client.indices.create({ index: ES_INDEX_NAME, body: { mappings } });
        // Index data into Elasticsearch
        const data = await fetch(jsonl)
            .then(response => response.text())
            .then(text => text);
        const publications = data.split('\n');
        const body = [];
        for(let i = 0; i < publications.length; i++) {
            const publication = publications[i].replaceAll(': NaN', ': null');
            if(publication.length > 0) {
                body.push({ index : { _index : ES_INDEX_NAME } });
                body.push(JSON.parse(publication));
            }
        }
        const response = await client.bulk({ body, refresh: true });
        setIsLoading(response.items.length);
    }

    useEffect(() => {
        getData();
    })

    return (
        <div>
            <h2>
                Load
            </h2>
            <div>
                {
                    (isLoading === 0) ? (<>Please wait while loading data ...</>) : (<>Data are loaded</>)
                }
            </div>
        </div>
    );
}

export default Load;