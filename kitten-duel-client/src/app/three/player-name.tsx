interface PlayerNameProps {
  name: string;
  position: 'left' | 'right';
}

const PlayerName: React.FC<PlayerNameProps> = ({ name, position }) => {
  return <div style={{ fontSize: 20, textAlign: position }}>{name}</div>;
};

export default PlayerName;
