function movingCount(threshold, rows, cols)
{
    // write code here
    
    let result = 0;
    let type = [];
    for(let i=0;i<rows;i++) {
        type[i] = [];
        for(let j=0;j<cols;j++) {
            type[i][j]=0;
        }
    }
    findWay(0,0);
    function findWay(x,y) {
        if(checkCanRun(x,y)) {
            type[x][y]=1;
            result++;
        } else {
            return false;
        }
        findWay(x+1,y);
        findWay(x,y+1);
    }
    function checkCanRun(x,y) {
        const iCount = Array.prototype.reduce.call(x.toString(),(all,item) => all+=Number(item),0);
        const jCount = Array.prototype.reduce.call(y.toString(),(all,item) => all+=Number(item),0);
        if(x<rows&&y<cols&&iCount+jCount<=threshold&&type[x][y]===0) {
            return true;
        }
        return false;
    }
    console.log(type);
    return result;
}

movingCount(9,10,10);