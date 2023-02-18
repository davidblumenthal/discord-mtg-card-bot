export type Node = {
    data : any;
    children : Record<string,Node>;
};

export const newNode = () : Node => {
    return {
        data : undefined,
        children : {}
    };
};

export function addData(node : Node, path : string[], data : any, pathIndex: number = 0) : void {
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

export function getData(node : Node, path : string[], pathIndex: number = 0) : any | undefined {
    if(pathIndex === path.length) {
        return node.data;
    }
    const childNode = node.children[path[pathIndex]];
    if(childNode) {
        return getData(childNode, path, pathIndex+1);
    }
    return undefined;
}