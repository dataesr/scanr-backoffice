import { useEffect, useState } from 'react';

import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import { ReactTabulator } from 'react-tabulator';
import { ES_INDEX_NAME, getEsClient } from '../../utils';

const Publications = () => {
    const [publications, setPublications] = useState(null);

    const columns = [
        { title: 'Title', field: '_source.title' },
        { title: 'DOI', field: '_source.doi' },
        { title: 'Actions', formatter: (cell) => `<a title="Lien vers la publication" href="./publication/${cell.getRow().getData()._source.doi}">Ouvrir</a>` }
    ];

    const getPublications = async () => {
        const client = getEsClient();
        const results = await client.search({ index: ES_INDEX_NAME, size: 20 });
        const publications = results?.hits?.hits || {};
        setPublications(publications);
    };

    useEffect(() => {
        if(publications === null) {
            getPublications();
        }
    }, [getPublications]);

    return (
        <div>
            <h2>
                Publications
            </h2>
            <ReactTabulator columns={columns} data={publications} options={ { layout: 'fitData', pagination: 'local', paginationSize: 10 } } />
        </div>
    );
};

export default Publications;