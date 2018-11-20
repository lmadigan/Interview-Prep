class BinaryTreeNode{
    constructor(val) {
        this.value = val; 
        this.left; 
        this.right;
    }

    
    function depthFirstSearch(node){
        if( node.value === null) {
            return; 
        }
    
        console.log(node) ;
    
        depthFirstSearch(node.left); 
        depthFirstSearch(node.right); 
    }
}



var root = {
    value: 5, 
    left
}