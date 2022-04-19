import { Table } from '@dataesr/react-dsfr';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/bootstrap/tabulator_bootstrap.min.css';
import { ReactTabulator } from 'react-tabulator';
import { ES_INDEX_NAME, getEsClient } from '../../utils';

const Affiliations = (affiliations) => {
    affiliations.map((affiliation, index) => {
        affiliation.key = index;
        return affiliation;
    });
    const columns = [
        { name: 'datasource', label: 'datasource' },
        { name: 'detected_countries', label: 'detected_countries', render: ({ detected_countries }) => detected_countries.join(',') },
        { name: 'id', label: 'id' },
        { name: 'ids', label: 'ids', render: ({ ids }) => ids.map((id) => id.type + ':' + id.id).join(',') },
        { name: 'name', label: 'name' }
    ];
    return (
        <Table caption="Affiliations" data={affiliations} columns={columns} rowKey="key" perPage={10} />
    );
};

const Authors = (authors) => {
    authors.map((author, index) => {
        author.key = index;
        return author;
    });
    const columns = [
        { name: 'first_name', label: 'Prénom' },
        { name: 'last_name', label: 'Nom' },
        { name: 'id', label: 'id', render: ({ id }) => id?.replace(/^idref/, '') || '' },
        { name: 'affiliations', label: 'Affiliations', render: ({ affiliations }) => {
            affiliations = affiliations ? affiliations : [];
            affiliations?.map((affiliation, index) => {
                affiliation.key = index;
                return affiliation
            });
            const columns = [
                { name: 'name', label: 'Libellé' },
                { name: 'detected_countries', label: 'Pays détectés', render: ({ detected_countries }) => detected_countries.join(', ') },
                { name: 'ids', label: 'Identifiants', render: ({ ids }) => ids.map((id) => `${id.type}:${id.id}`)}
            ];
            return (
                (affiliations.length) ? (
                    <Table caption="" data={affiliations} columns={columns} rowKey="key" />
                ) : (<></>)
            )}
        }
    ];

    const columns1 = [
        { field: 'first_name', title: 'Prénom' },
        { field: 'last_name', title: 'Nom' },
    ];

    return (
        <>
            <Table caption="Auteurs" data={authors} columns={columns} rowKey="key" perPage={10} />
            <ReactTabulator data={authors} columns={columns1} />
        </>
    )
};

const Publication = () => {
    const [publication, setPublication] = useState(null);
    const params = useParams();
    const doi = params['*'];

    const getPublication = async () => {
        const client = getEsClient();
        const results = await client.search({ index: ES_INDEX_NAME, q: 'doi:"' + doi + '"' });
        const publication = results?.hits?.hits?.[0] || {};
        setPublication(publication);
    };

    useEffect(() => {
        if(publication === null) {
            getPublication();
        }
    }, [getPublication]);

    return (
        <div>
            <h2>
                {publication?._source.title}
            </h2>
            <div>
                {
                    (publication) ? (<>
                        <a target="_blank" rel="noreferrer" href={'http://doi.org/' + publication._source.doi}>{publication._source.doi}</a><br />
                        {Authors(publication._source.authors)}
                        {Affiliations(publication._source.affiliations)}
                    </>) : (<></>)
                }
            </div>
        </div>
    );
};

export default Publication;