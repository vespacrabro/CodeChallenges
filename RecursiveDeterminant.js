function minorOf(M,x,y){
    const L = M.length
    let Minor = []
    
    for (let i = 0; i < L-1; i++){
        Minor.push([]);
    };

    let counter = 0;
    
    for (let i = 0; i < L; i++){
        if( i === x ) continue;
        for (let j = 0; j < L; j++){
            if (j===y) continue;
            Minor[counter].push(M[i][j])
        }
    counter++;
    }
    
    return Minor
}

function determinant(M){
    let result = 0;
    const L = M.length;
    if (L === 1) return M[0][0]
    if (L === 2) return  M[0][0] * M[1][1] - M[0][1] * M[1][0];
    for( let j = 0; j < L; j++) 
        result += M[0][j] * ((-1)**j) * determinant(minorOf(M, 0, j));
    
    return result;
}
