import '../styles/NodesList.css';
import SingleNode from './SingleNode';

const NodesList = (props) => {
  const { nodeListArray } = props;
  return (
    <div>
      <h2 className="node-list-heading">Vote Statistics of Validator Nodes</h2>
      <div className="node-list-header">
        <p>Node Addresses</p>
        <div className="stats-header">
          <p>Relative Weight %</p>
          <p>Votes For Node</p>
        </div>
      </div>
      {nodeListArray &&
        nodeListArray.map((nodeObject) => {
          return (
            <SingleNode
              key={nodeObject.address}
              nodeID={nodeObject.address}
              nodeVotes={nodeObject.votes}
              relativeWeight={nodeObject.relativeWeightPercent}
            />
          );
        })}
    </div>
  );
};

export default NodesList;
