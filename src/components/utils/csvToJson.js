function removeSpecialCharacters(string) {
  let conversion = {'ü':'u','ö':'o'}; // add all known german characters here and their equivalent english alphabets

  for (let c in conversion){
	  if (string.includes(c))
	  string = string.replace(c,conversion[c]);
  }
	  
  return string;
}


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
    
            for (let j = 0; j < headers.length; j++){
                if (j === 0) currentline[j] = removeSpecialCharacters(currentline[j]);
                obj[headers[j]] = currentline[j]?.slice(1,-1);
                
            }
    
            result.push(obj);
    
        }
        resolve( {headers,result});
     })

  }