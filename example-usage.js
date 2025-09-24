// 이제 실제 프로젝트에서 이렇게 사용할 수 있습니다!

// 1. React 컴포넌트 import
import { Button, Card, Modal, Input, Table } from '@yourusername/bricks-design-system';

// 2. CSS 파일 import (필수!)
import '@yourusername/bricks-design-system/core/styles/bundle.css';

// 3. React 앱에서 사용
function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="app">
      {/* Card 컴포넌트 */}
      <Card>
        <h2>Welcome to BRICKS Design System</h2>

        {/* Button 컴포넌트 */}
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>

        {/* Input 컴포넌트 */}
        <Input
          label="Username"
          placeholder="Enter your username"
        />
      </Card>

      {/* Modal 컴포넌트 */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>Example Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is using BRICKS Design System!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Table 컴포넌트 */}
      <Table
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'status', label: 'Status' }
        ]}
        data={[
          { id: 1, name: 'Item 1', status: 'Active' },
          { id: 2, name: 'Item 2', status: 'Inactive' }
        ]}
      />
    </div>
  );
}

export default App;