import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    applyNodeChanges,
    applyEdgeChanges
  } from 'react-flow-renderer';

import AssetMenu from "./AssetMenu"

import DataSource from "../../assets/images/lego.svg"
import Join from "../../assets/images/join.svg"

import "./css/Builder.css"

const initialNodes = [];
const initialEdges = []
let id = 0;
const getId = () => `dndnode_${id++}`;

const Builder = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [stateConnected, setStateConnected] = useState({})
  
    const onConnect = async (params) => {
        await setEdges((eds) => addEdge(params, eds))
    };

    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);
  
    const onDrop = useCallback(
      (event) => {
        event.preventDefault();
  
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
  
        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }
  
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
          id: getId(),
          type,
          position,
          data: {
            label: (
                <div className='outer-node-container'>
                    <span className='node-item-figure'>
                        <img src={(type === "input" || type === "output") ? DataSource : Join} alt="" />
                    </span>
                </div>
              )
          },
          className: type + "-custom-node dnd-node-item",
          sourcePosition: "right",
          targetPosition: "left"
        };
  
        setNodes((nds) => nds.concat(newNode));
      },
      [reactFlowInstance]
    );

    const onNodesChange = useCallback(
        (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
        []
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
        []
    );
    
    useEffect(()=>{
        edges.length > 0 && console.log("EDGES:::", edges, "NODES:::", nodes)

        if(edges.length > 0){
            let connected = {}
                connected.fromNode = edges[edges.length - 1].source
                connected.toNode = edges[edges.length - 1].target
                connected.flow = nodes.filter(item => item.id == edges[edges.length - 1].source)[0].type + "-" + nodes.filter(item => item.id == edges[edges.length - 1].target)[0].type
            

            setStateConnected(connected)
            setTimeout(() => {
                setStateConnected({})
            }, 3000);
        }
    },[edges])

    return (
        <div className="main-container d-flex">
            <ReactFlowProvider>
                <div className="builder-content main-content-container">
                    <div className="dndflow">
                            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                                <ReactFlow
                                    nodes={nodes}
                                    edges={edges}
                                    onNodesChange={onNodesChange}
                                    onEdgesChange={onEdgesChange}
                                    onConnect={onConnect}
                                    onInit={setReactFlowInstance}
                                    onDrop={onDrop}
                                    onDragOver={onDragOver}
                                    fitView
                                >
                                    <Controls />
                                </ReactFlow>
                            </div>
                    </div>

                        {
                            Object.keys(stateConnected).length != 0 ? 
                            <code>
                                <div className="code-block-item">
                                    <label>From</label> : <span>{stateConnected.fromNode}</span>
                                </div>
                                <div className="code-block-item">
                                    <label>To</label> : <span>{stateConnected.toNode}</span>
                                </div>
                                <div className="code-block-item">
                                    <label>Flow</label> : <span>{stateConnected.flow}</span>
                                </div>
                            </code> : ""
                        }
                </div>
                <AssetMenu
                    stateConnected={stateConnected}
                />
            </ReactFlowProvider>
        </div>
    );
}

export default Builder;