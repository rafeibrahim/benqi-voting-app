import '../styles/SingleNode.css';

const SingleNode = (props) => {
  const { nodeID, nodeVotes, relativeWeight } = props;
  return (
    <div className="single-list-item">
      <p className="id-p">{nodeID}</p>
      <div className='stats-div'>
        <p className="percent-p">{relativeWeight} %</p>
        <p className="votes-p">{nodeVotes.toString()}</p>
      </div>
    </div>
  );
};

export default SingleNode;
