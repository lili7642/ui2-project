import husdata from './hus_data';

const randomint = Math.floor(Math.random() * (husdata.length));
const hus = husdata[randomint];

export default hus;