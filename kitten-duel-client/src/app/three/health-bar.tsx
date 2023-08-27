interface HealthBarProps {
  hp: number;
  maxHp: number;
  position: 'left' | 'right';
}

const HealthBar: React.FC<HealthBarProps> = ({ hp, maxHp, position }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 40,
        [position]: 10,
        width: '99%',
        height: 20,
        backgroundColor: 'grey',
      }}
    >
      <div
        style={{
          width: `${(hp / maxHp) * 100}%`,
          height: '100%',
          backgroundColor: 'red',
          float: position,
        }}
      />
    </div>
  );
};

export default HealthBar;
