export function csvToJSON(csvStr) {
    return new Promise((resolve, reject) => {

        let lines=csvStr.split("\n");
        let result = [];

        let headers=lines[0].split(",");

        for(let i = 0; i < headers.length;i++)
            headers[i] = headers[i].slice(1,-1);

    
        for(let i=1;i<lines.length;i++){
    
            let obj = {};
            let currentline=lines[i].split(",");
    
            for(let j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j]?.slice(1,-1);
                
            }
    
            result.push(obj);
    
        }
        resolve( {headers,result});
     })

  }