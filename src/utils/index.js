import elasticsearch from 'elasticsearch-browser';

const ES_HOST = 'localhost:9200';
const ES_INDEX_NAME = 'scanr-backoffice';

const getEsClient = () => {
    return elasticsearch.Client({ host: ES_HOST });
}

export {
    ES_INDEX_NAME,
    getEsClient
};
