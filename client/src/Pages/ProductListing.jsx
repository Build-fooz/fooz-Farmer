import { Form, Card, Container, Row, Col } from "react-bootstrap";
import Logo from "../assets/images/Logo.png";
import { Headset } from "react-bootstrap-icons";

export default function ProductListing() {
  return (
    <div className="min-vh-100 bg-gradient-custom pb-4">
      <Container className="max-w-4xl">
        {/* Logo */}
        <img src={Logo} alt="logo" width={100} height={100} className="mx-auto mb-3" />

        {/* Header */}
        <div className="text-center mb-4">
        <h1 className="fw-bold mb-2">Product Listing</h1>
        <p className="text-secondary">Monitor your farm products performance</p>
        </div>

        {/* Form Card */}
        <Card className="p-4 mb-4 custom-box-shadow">
          <h2 className="fs-4 fw-semibold mb-3">Product Listing Overview</h2>
          <h5 className="fs-6 fw-medium mb-3">Add New Product</h5>

          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text" placeholder="Start typing for suggestions..." className="border border-dark" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Quantity Available</Form.Label>
                  <Form.Control type="number" placeholder="0" className="border border-dark" />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Unit</Form.Label>
                  <Form.Select className="border border-dark" defaultValue="kg">
                    {['kg', 'g', 'lb'].map(unit => <option key={unit} value={unit}>{unit}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Size/Grade</Form.Label>
                  <Form.Select className="border border-dark" defaultValue="large">
                    {['Large', 'Medium', 'Small'].map(size => <option key={size} value={size.toLowerCase()}>{size}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Selling Price</Form.Label>
                  <Form.Control type="text" placeholder="₹" className="border border-dark" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Special Notes</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="E.g., Organic certification, harvest date" className="border border-dark" />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Sell To</Form.Label>
                  <Form.Select className="border border-dark" defaultValue="fooz">
                    <option value="fooz">Fooz Company</option>
                    <option value="other">Other Company</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <div className="form-control bg-custom-sky fw-bold text-dark mb-3">
                    <Form.Label>Current Market Price</Form.Label>
                    <span className="d-block">₹45-55/kg</span>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-3  py-3 w-100">
              <button className="w-100 bg-light rounded text-dark fw-semibold">Save Draft</button>
              <button className="w-100 bg-black rounded text-light">List Product</button>
            </div>
          </Form>

          <hr className="border-2 border-secondary my-4" />
          <h5 className="fw-semibold mb-2">Photo Guidelines</h5>
          <Card className="bg-custom-cream p-3 rounded mb-4">
            <ul className="fw-semibold">
              {[
                "Use natural lighting for best results",
                "Include size reference object",
                "Show product from multiple angles",
                "Ensure photos are clear and in focus",
                "Highlight any unique features or quality indicators"
              ].map((tip, index) => <li key={index}>{tip}</li>)}
            </ul>
          </Card>
        <hr className="border-2 border-secondary my-4" />

        {/* Stats */}
        <Row className="mb-4">
          {[
            { label: "Products Listed", value: "12", bg: "bg-custom-sky" },
            { label: "Total Sales", value: "₹24,500", bg: "bg-custom-mint" },
            { label: "Active Orders", value: "5", bg: "bg-custom-lavender" },
            { label: "Draft Listings", value: "3", bg: "bg-custom-cream" }
          ].map((stat, index) => (
            <Col key={index}>
              <Card className={`text-center ${stat.bg} p-3`}>
                <small className="text-secondary">{stat.label}</small>
                <h4 className="fw-bold mt-1">{stat.value}</h4>
              </Card>
            </Col>
          ))}
        </Row>
        <hr className="border-2 border-secondary my-4" />


        {/* Chat Support */}
        <Card className="p-4 mb-4 border border-light">
          <h4 className="fw-semibold mb-3">Chat Support</h4>
          <div className="bg-custom-gray rounded p-3">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Headset size={20} />
              <div>
                <h6 className="fw-medium mb-0">Need Help?</h6>
                <p className="text-secondary small mb-0">Our team is here to assist you</p>
              </div>
            </div>
            <button className="w-100 bg-black rounded text-light">Start Chat</button>
          </div>
        </Card>
        <hr className="border-2 border-secondary my-4" />


        {/* Analytics Insights */}
        <div className="mb-4">
          <h5 className="fw-bold mb-2">Analytics Insights</h5>
          <Card className="fw-semibold rounded bg-custom-gray p-3 pb-5">Sales Trend</Card>
        </div>
        </Card>
      </Container>
    </div>
  );
}
