import { useEffect, useState } from "react";
import FilterIcon from "../../assets/images/filter_list.png"
import DataSource from "../../assets/images/lego.svg"
import Join from "../../assets/images/join.svg"

const AssetMenu = (props) => {
    const [tabState, setTabState] = useState('data-source')
    const [dragItems, setDragItems] = useState([
        {
            type: "data-source",
            label: "Sample Data",
            dragEv: 'input',
            sourcePosition: 'right'

        },
        {
            type: "functions",
            label: "Join",
            dragEv: 'default',
            sourcePosition: 'right',
            targetPosition: 'left',

        },
        {
            type: "destinations",
            label: "Redshift",
            dragEv: 'output',
            sourcePosition: 'right',
            targetPosition: 'left',

        },
    ])
    const onDragStart = (event, nodeType) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };
    
    return (
        <aside className="builder-options d-flex f-column">
            <header className="search-header-menu d-flex">
                <input type="search" placeholder="Data" />
                <button className="btn">
                    <img src={FilterIcon} alt="" />
                </button>
            </header>

            <div className="asset-menu-body d-flex f-column">
                <ul className="tab-nav">
                    <li className={tabState === "data-source" ? "btn active" : "btn "} onClick={()=>setTabState("data-source")}>
                        Data source
                    </li>
                    <li className={tabState === "functions" ? "btn active" : "btn "} onClick={()=>setTabState("functions")}>
                        Functions
                    </li>
                    <li className={tabState === "destinations" ? "btn active" : "btn "} onClick={()=>setTabState("destinations")}>
                        Destinations
                    </li>
                </ul>

                <div className="asset-items-container d-flex f-column">
                    {tabState === "data-source" && 
                        <>
                            <div className="tab-content">
                                <p>Available Data source</p>
                                <ul>
                                    {dragItems.filter(item => item.type == "data-source").map((dragItem, i) => (
                                        <li key={"data-source-"+i} className="dndnode input" onDragStart={(event) => onDragStart(event, "input")} draggable>
                                            <span className="node-icon">
                                                <img src={DataSource} alt="" />
                                            </span>
                                            <span className="node-text">{dragItem.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <footer>
                                <button className="btn add-asset-btn">Add new Data Source</button>
                            </footer>
                        </>
                    }
                    {tabState === "functions" && 
                        <>
                            <div className="tab-content">
                                <p>Available Functions</p>
                                <ul>
                                    {dragItems.filter(item => item.type == "functions").map((dragItem, i) => (
                                        <li key={"functions-"+i} className="dndnode" onDragStart={(event) => onDragStart(event, "function")} draggable>
                                            <span className="node-icon">
                                                <img src={Join} alt="" />
                                            </span>
                                            <span className="node-text">{dragItem.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <footer>
                                <button className="btn add-asset-btn">Add new Functions</button>
                            </footer>
                        </>
                    }
                    {tabState === "destinations" && 
                        <>
                            <div className="tab-content">
                                <p>Available Destinations</p>
                                <ul>
                                    {dragItems.filter(item => item.type == "destinations").map((dragItem, i) => (
                                        <li key={"destinations-"+i} className="dndnode" onDragStart={(event) => onDragStart(event, "output")} draggable>
                                            <span className="node-icon">
                                                <img src={DataSource} alt="" />
                                            </span>
                                            <span className="node-text">{dragItem.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <footer>
                                <button className="btn add-asset-btn">Add new Functions</button>
                            </footer>
                        </>
                    }
                </div>
            </div>
        </aside>
    );
}
 
export default AssetMenu;