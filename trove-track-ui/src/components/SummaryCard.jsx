import { Card } from "react-bootstrap";

const SummaryCard = ({ title = "Summary", value="N/A" }) => {
  return (
    <Card>
      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
        <Card.Text className="fs-5">{value}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default SummaryCard;