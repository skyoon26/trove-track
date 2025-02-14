import { useState } from 'react';
import { Button, Badge } from 'react-bootstrap';

const Counter = () => {

  const [count, setCount] = useState(0);

  return (
    <div className="d-flex align-items-center gap-2">
      <Button variant="outline-danger" onClick={() => setCount(count - 1)} disabled={count === 0}>
        -
      </Button>
      <Badge bg="primary" className="fs-4">{count}</Badge>
      <Button variant="outline-success" onClick={() => setCount(count + 1)}>
        +
      </Button>
    </div>
  )
}

export default Counter