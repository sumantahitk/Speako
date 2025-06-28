import datauri from "datauri/parser.js";
import path from "path";
import { deflate } from "zlib";

const parser = new datauri();

const getDataUri = (file)=>{
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer).content;
}

export default getDataUri;