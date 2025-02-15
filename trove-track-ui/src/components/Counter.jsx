import { useState } from 'react';
import { Button, Badge } from 'react-bootstrap';

const Counter = () => {

  const [count, setCount] = useState(0);

  return (
    <div>
      <Badge pill bg="primary" className="d-flex align-items-center gap-2 fs-5 px-3 py-2">
        <Button size="sm" onClick={() => setCount(count - 1)} disabled={count === 0}>-</Button>
        {count}
        <Button size="sm" onClick={() => setCount(count + 1)}>+</Button>
      </Badge>
    </div>
  )
}

export default Counter