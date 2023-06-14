/*File: huspicker.js

This file will pick a house from hus_data.js at random.
*/

import husdata from './hus_data';

const randomint = Math.floor(Math.random() * (husdata.length));
const hus = husdata[randomint];

export default hus;