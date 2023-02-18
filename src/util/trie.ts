type Node = {
    data ?: any;
    children : Record<string,Node>;
};

const newNode = () : Node => {
    return {
        children : {}
    };
};

function addData(node : Node, path : string[], data : any, pathIndex: number = 0) : void {
    if(!node.children[path[pathIndex]]){
        node.children[path[pathIndex]] = newNode();
    }
    const childNode = node.children[path[pathIndex]];
    if(pathIndex === path.length - 1) {
        childNode.data = data;
    }
    else {
        addData(childNode, path, data, pathIndex+1);
    }
}

function getData(node : Node, path : string[], pathIndex: number = 0) : any | undefined {
    if(pathIndex === path.length) {
        return node.data;
    }
    const childNode = node.children[path[pathIndex]];
    if(childNode) {
        return getData(childNode, path, pathIndex+1);
    }
    return undefined;
}

function getAllDataInPath(node: Node, path : string[]) : any[] {
    const outputSet : Set<any> = new Set();

    for (let startPathIndex = 0; startPathIndex<path.length; startPathIndex++) {
        let currentNode = node;
        for (let pathIndex = startPathIndex; pathIndex < path.length; pathIndex++) {
            const word = path[pathIndex];
            if ("data" in currentNode) {
                outputSet.add(currentNode.data);
            }
            if (currentNode.children[word]) {
                currentNode = currentNode.children[word];
            } else {
                break;
            }
        }
    }
    return [...outputSet];
}

export function makeTrie() {
  const trie = newNode();
  return {
      addData: (path:string[], data:any) => addData(trie,path, data),
      getData: (path:string[]) => getData(trie, path),
      getAllDataInPath: (path:string[]) => getAllDataInPath(trie, path)
  };
}