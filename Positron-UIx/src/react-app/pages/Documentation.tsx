import { useState } from 'react';
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from '@/positron';
import { Book, Download, Github, ChevronRight } from 'lucide-react';

const docSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      { id: 'installation', title: 'Installation' },
      { id: 'usage', title: 'Usage' },
      { id: 'theming', title: 'Theming' },
    ]
  },
  {
    id: 'components',
    title: 'Components',
    items: [
      { id: 'button', title: 'Button' },
      { id: 'card', title: 'Card' },
      { id: 'input', title: 'Input' },
      { id: 'badge', title: 'Badge' },
      { id: 'alert', title: 'Alert' },
      { id: 'checkbox', title: 'Checkbox' },
      { id: 'switch', title: 'Switch' },
      { id: 'progress', title: 'Progress' },
      { id: 'avatar', title: 'Avatar' },
      { id: 'spinner', title: 'Spinner' },
      { id: 'toast', title: 'Toast' },
      { id: 'select', title: 'Select' },
      { id: 'modal', title: 'Modal' },
      { id: 'tabs', title: 'Tabs' },
      { id: 'accordion', title: 'Accordion' },
      { id: 'table', title: 'Table' },
      { id: 'textarea', title: 'Textarea' },
      { id: 'dropdown', title: 'Dropdown' },
      { id: 'slider', title: 'Slider' },
      { id: 'radiogroup', title: 'RadioGroup' },
      { id: 'tooltip', title: 'Tooltip' },
      { id: 'pagination', title: 'Pagination' },
      { id: 'breadcrumb', title: 'Breadcrumb' },
      { id: 'datepicker', title: 'DatePicker' },
      { id: 'fileupload', title: 'FileUpload' },
      { id: 'stepper', title: 'Stepper' },
      { id: 'popover', title: 'Popover' },
      { id: 'skeleton', title: 'Skeleton' },
    ]
  },
  {
    id: 'guides',
    title: 'Guides',
    items: [
      { id: 'customization', title: 'Customization' },
      { id: 'typescript', title: 'TypeScript' },
      { id: 'accessibility', title: 'Accessibility' },
    ]
  }
];

const codeExamples = {
  installation: `# Install Positron-UI
npm install @positron-ui/react

# Or with yarn
yarn add @positron-ui/react`,

  usage: `import { Button, Card } from '@positron-ui/react';

function App() {
  return (
    <Card>
      <Button variant="solid" color="primary">
        Get Started
      </Button>
    </Card>
  );
}`,

  theming: `// positron.config.ts
export const customTheme = {
  colors: {
    primary: {
      500: '#your-color',
      // ... other shades
    }
  }
};`,

  button: `import { Button } from '@positron-ui/react';
import { Play } from 'lucide-react';

// Basic usage
<Button>Click me</Button>

// With variants and colors
<Button variant="outline" color="secondary">
  Secondary
</Button>

// With icons and loading
<Button 
  variant="solid" 
  color="primary" 
  leftIcon={<Play />}
  isLoading={loading}
>
  Play Video
</Button>`,

  card: `import { Card, CardHeader, CardTitle, CardContent } from '@positron-ui/react';

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>

// Elevated card
<Card variant="elevated" padding="lg">
  Content with more padding
</Card>`,

  input: `import { Input } from '@positron-ui/react';
import { User } from 'lucide-react';

// Basic input
<Input placeholder="Enter text..." />

// With label and helper
<Input
  label="Username"
  placeholder="Enter username"
  helperText="Must be unique"
  leftIcon={<User />}
/>

// Error state
<Input
  label="Email"
  error={true}
  helperText="Please enter a valid email"
/>`,

  badge: `import { Badge } from '@positron-ui/react';

// Different variants
<Badge variant="solid" color="primary">New</Badge>
<Badge variant="outline" color="warning">Beta</Badge>
<Badge variant="soft" color="success">Pro</Badge>

// Different sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`,

  alert: `import { Alert } from '@positron-ui/react';

// Basic alert
<Alert variant="info" title="Info">
  This is an informational alert
</Alert>

// Closable alert
<Alert 
  variant="success" 
  title="Success!"
  closable={true}
  onClose={() => console.log('Closed')}
>
  Operation completed successfully
</Alert>`,

  checkbox: `import { Checkbox } from '@positron-ui/react';

// Basic checkbox
<Checkbox label="Accept terms" />

// With description
<Checkbox 
  label="Enable notifications"
  description="Get notified about updates"
/>

// Indeterminate state
<Checkbox 
  label="Select all"
  indeterminate={someSelected}
/>`,

  switch: `import { Switch } from '@positron-ui/react';

// Basic switch
<Switch label="Dark mode" />

// Controlled switch
<Switch 
  label="Auto-save"
  checked={autoSave}
  onChange={(e) => setAutoSave(e.target.checked)}
/>

// Different sizes
<Switch size="lg" label="Large switch" />`,

  progress: `import { Progress } from '@positron-ui/react';

// Basic progress
<Progress value={65} />

// With label and value display
<Progress 
  value={progress}
  label="Upload progress"
  showValue={true}
  color="success"
/>

// Different colors
<Progress value={30} color="warning" />
<Progress value={100} color="success" />`,

  avatar: `import { Avatar } from '@positron-ui/react';

// With image
<Avatar 
  src="https://example.com/avatar.jpg"
  alt="User avatar"
/>

// With fallback text
<Avatar fallback="JD" color="primary" />

// Default (user icon)
<Avatar size="lg" color="secondary" />

// Different sizes
<Avatar size="xs" fallback="S" />
<Avatar size="xl" fallback="XL" />`,

  spinner: `import { Spinner } from '@positron-ui/react';

// Different variants
<Spinner variant="circular" />
<Spinner variant="dots" />
<Spinner variant="square" />

// Different sizes and colors
<Spinner size="lg" color="primary" />
<Spinner size="sm" color="success" variant="dots" />`,

  toast: `import { Toast, ToastContainer } from '@positron-ui/react';

// Toast component (usually managed by a provider)
<Toast
  id="unique-id"
  title="Success!"
  description="Operation completed"
  variant="success"
  onClose={(id) => removeToast(id)}
/>

// Toast container
<ToastContainer 
  toasts={toasts}
  position="top-right"
/>`,

  select: `import { Select } from '@positron-ui/react';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

// Basic select
<Select 
  options={options}
  placeholder="Choose a fruit..."
  onValueChange={(value) => console.log(value)}
/>

// With label and error
<Select
  options={options}
  label="Favorite Fruit"
  helperText="Please select your favorite"
  error={hasError}
/>`,

  modal: `import { Modal, ModalHeader, ModalFooter } from '@positron-ui/react';

// Basic modal
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <p>Modal content goes here</p>
</Modal>

// With header and footer
<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="lg"
>
  <ModalHeader>
    <p>Are you sure you want to continue?</p>
  </ModalHeader>
  <ModalFooter>
    <Button variant="outline" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button onClick={handleConfirm}>
      Confirm
    </Button>
  </ModalFooter>
</Modal>`,

  tabs: `import { Tabs, TabsContent } from '@positron-ui/react';

const tabItems = [
  { value: 'tab1', label: 'Overview' },
  { value: 'tab2', label: 'Details', badge: 'New' },
  { value: 'tab3', label: 'Settings' },
];

// Basic tabs
<Tabs items={tabItems} defaultValue="tab1">
  <TabsContent value="tab1">
    <p>Overview content</p>
  </TabsContent>
  <TabsContent value="tab2">
    <p>Details content</p>
  </TabsContent>
  <TabsContent value="tab3">
    <p>Settings content</p>
  </TabsContent>
</Tabs>

// Pills variant
<Tabs items={tabItems} variant="pills" />`,

  accordion: `import { Accordion } from '@positron-ui/react';

const accordionItems = [
  {
    id: 'item-1',
    title: 'Getting Started',
    content: 'Learn the basics of our platform...'
  },
  {
    id: 'item-2', 
    title: 'Advanced Features',
    content: 'Explore powerful advanced capabilities...'
  }
];

// Single accordion
<Accordion items={accordionItems} type="single" />

// Multiple accordion
<Accordion items={accordionItems} type="multiple" />`,

  table: `import { Table } from '@positron-ui/react';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { 
    key: 'actions', 
    header: 'Actions',
    render: (_, row) => (
      <Button size="sm">Edit</Button>
    )
  }
];

const data = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

// Basic table
<Table columns={columns} data={data} />

// With sorting and variants
<Table 
  columns={columns} 
  data={data}
  variant="striped"
  sortBy="name"
  sortDirection="asc"
  onSort={(key, direction) => handleSort(key, direction)}
/>`,

  textarea: `import { Textarea } from '@positron-ui/react';

// Basic textarea
<Textarea placeholder="Enter your message..." />

// With label and validation
<Textarea
  label="Message"
  placeholder="Type your message here..."
  rows={6}
  helperText="Maximum 500 characters"
  error={hasError}
/>

// Brutal variant
<Textarea 
  variant="brutal"
  resize="none"
  defaultValue="Pre-filled content"
/>`,

  dropdown: `import { Dropdown } from '@positron-ui/react';
import { User, Settings, LogOut } from 'lucide-react';

const dropdownItems = [
  { value: 'profile', label: 'Profile', icon: <User /> },
  { value: 'settings', label: 'Settings', icon: <Settings /> },
  { value: 'separator', label: '', separator: true },
  { value: 'logout', label: 'Log Out', icon: <LogOut /> },
];

// Basic dropdown
<Dropdown
  trigger={<Button>Menu</Button>}
  items={dropdownItems}
  onSelect={(value) => console.log(value)}
/>

// Different placements
<Dropdown
  trigger={<Avatar />}
  items={dropdownItems}
  placement="bottom-end"
/>`,

  slider: `import { Slider } from '@positron-ui/react';

// Basic slider
<Slider defaultValue={50} />

// With label and value display
<Slider
  label="Volume"
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  showValue
  color="success"
/>

// Vertical slider
<Slider
  orientation="vertical"
  size="lg"
  color="accent"
/>`,

  radiogroup: `import { RadioGroup } from '@positron-ui/react';

const radioOptions = [
  { 
    value: 'starter', 
    label: 'Starter Plan',
    description: 'Perfect for individuals'
  },
  { 
    value: 'pro', 
    label: 'Pro Plan',
    description: 'Great for small teams'
  },
  { 
    value: 'enterprise', 
    label: 'Enterprise',
    description: 'For large organizations'
  },
];

// Basic radio group
<RadioGroup
  options={radioOptions}
  value={selectedPlan}
  onChange={setSelectedPlan}
  label="Choose your plan"
/>

// Horizontal layout
<RadioGroup
  options={radioOptions}
  orientation="horizontal"
  size="lg"
/>`,

  tooltip: `import { Tooltip } from '@positron-ui/react';

// Basic tooltip
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

// Different placements and triggers
<Tooltip 
  content="Click to toggle"
  placement="bottom"
  trigger="click"
>
  <Button variant="outline">Click me</Button>
</Tooltip>

// Custom delay
<Tooltip
  content="Helpful information here"
  placement="right"
  delay={500}
>
  <span>?</span>
</Tooltip>`,

  pagination: `import { Pagination } from '@positron-ui/react';

// Basic pagination
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={(page) => setCurrentPage(page)}
/>

// With customization
<Pagination
  currentPage={currentPage}
  totalPages={25}
  onPageChange={(page) => setCurrentPage(page)}
  showFirstLast={true}
  siblingCount={2}
  variant="brutal"
  size="lg"
/>

// Minimal pagination
<Pagination
  currentPage={currentPage}
  totalPages={5}
  onPageChange={(page) => setCurrentPage(page)}
  showFirstLast={false}
  size="sm"
/>`,

  breadcrumb: `import { Breadcrumb } from '@positron-ui/react';
import { User, Settings } from 'lucide-react';

const breadcrumbItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { 
    label: 'Users', 
    href: '/users',
    icon: <User className="w-4 h-4" />
  },
  { 
    label: 'Settings',
    icon: <Settings className="w-4 h-4" />
  }
];

// Basic breadcrumb
<Breadcrumb items={breadcrumbItems} />

// Without home icon
<Breadcrumb 
  items={breadcrumbItems}
  showHome={false}
/>

// Brutal variant
<Breadcrumb
  items={breadcrumbItems}
  variant="brutal"
  size="lg"
/>`,

  datepicker: `import { DatePicker } from '@positron-ui/react';

// Basic date picker
<DatePicker
  value={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  placeholder="Select date..."
/>

// With label and validation
<DatePicker
  value={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  label="Birth Date"
  helperText="Please select your birth date"
  error={hasError}
  dateFormat="dd/MM/yyyy"
/>

// With constraints
<DatePicker
  value={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  minDate={new Date()}
  maxDate={new Date(2025, 11, 31)}
  variant="brutal"
  size="lg"
/>`,

  fileupload: `import { FileUpload } from '@positron-ui/react';

// Basic file upload
<FileUpload
  onFilesChange={(files) => setFiles(files)}
  onFileRemove={(fileId) => removeFile(fileId)}
/>

// Image upload with preview
<FileUpload
  accept="image/*"
  multiple={true}
  maxFiles={5}
  maxSize={5 * 1024 * 1024} // 5MB
  showPreview={true}
  onFilesChange={(files) => setFiles(files)}
/>

// Brutal variant without drag & drop
<FileUpload
  variant="brutal"
  dragAndDrop={false}
  size="lg"
  accept=".pdf,.doc,.docx"
  onFilesChange={(files) => setFiles(files)}
/>`,

  stepper: `import { Stepper } from '@positron-ui/react';
import { User, CreditCard, Check } from 'lucide-react';

const steps = [
  {
    id: 'account',
    title: 'Account Info',
    description: 'Create your account',
    icon: <User className="w-4 h-4" />
  },
  {
    id: 'payment',
    title: 'Payment',
    description: 'Enter payment details',
    icon: <CreditCard className="w-4 h-4" />
  },
  {
    id: 'confirm',
    title: 'Confirmation',
    description: 'Review and confirm',
    icon: <Check className="w-4 h-4" />
  }
];

// Horizontal stepper
<Stepper
  steps={steps}
  currentStep={1}
  completedSteps={[0]}
/>

// Vertical stepper with clicks
<Stepper
  steps={steps}
  currentStep={currentStep}
  orientation="vertical"
  clickable={true}
  onStepClick={(step) => setCurrentStep(step)}
  variant="brutal"
  size="lg"
/>`,

  popover: `import { Popover, Button } from '@positron-ui/react';
import { Settings, User, HelpCircle } from 'lucide-react';

// Basic popover
<Popover
  trigger={<Button>Show Info</Button>}
  content={
    <div>
      <h3 className="font-bold mb-2">Quick Info</h3>
      <p>This is helpful information in a popover.</p>
    </div>
  }
/>

// Different placements and sizes
<Popover
  trigger={<Button variant="outline">Settings</Button>}
  content={
    <div className="space-y-2">
      <button className="block w-full text-left p-2 hover:bg-neutral-100">
        <User className="w-4 h-4 inline mr-2" />
        Profile
      </button>
      <button className="block w-full text-left p-2 hover:bg-neutral-100">
        <Settings className="w-4 h-4 inline mr-2" />
        Settings
      </button>
    </div>
  }
  placement="bottom"
  size="md"
/>

// Brutal variant without arrow
<Popover
  trigger={
    <Button variant="solid" color="accent">
      <HelpCircle className="w-4 h-4" />
    </Button>
  }
  content={
    <div>
      <h4 className="font-mono font-bold mb-2">Help & Support</h4>
      <p className="text-sm mb-3">Need assistance? Here are some quick tips:</p>
      <ul className="text-sm space-y-1">
        <li>• Check the documentation</li>
        <li>• Contact support team</li>
        <li>• Join our community</li>
      </ul>
    </div>
  }
  variant="brutal"
  size="lg"
  placement="left"
  arrow={false}
/>`,

  skeleton: `import { Skeleton, SkeletonCard } from '@positron-ui/react';

// Basic skeletons
<Skeleton variant="text" />
<Skeleton variant="circular" size="lg" />
<Skeleton variant="rectangular" width={200} height={100} />

// Avatar skeleton
<Skeleton variant="avatar" size="xl" />

// Multiple text lines
<Skeleton variant="text" lines={3} />

// Custom sizes
<Skeleton 
  variant="rectangular" 
  width="100%" 
  height={300}
  brutal={true}
/>

// Non-animated skeleton
<Skeleton 
  variant="text" 
  animated={false}
  brutal={true}
/>

// Complete skeleton card
<SkeletonCard 
  includeAvatar={true}
  includeImage={true}
  lines={4}
  brutal={false}
/>

// Brutal skeleton card
<SkeletonCard 
  includeAvatar={false}
  includeImage={false}
  lines={2}
  brutal={true}
/>`
};

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('installation');

  const getContent = (sectionId: string) => {
    switch (sectionId) {
      case 'installation':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black font-mono text-neutral-900 mb-4">Installation</h1>
              <p className="text-lg font-mono text-neutral-700 mb-6">
                Get started with Positron-UI in your React project.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>NPM Installation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-neutral-900 brutal-border rounded p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-green-400">
                    {codeExamples.installation}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-mono text-neutral-700">
                  <li className="flex items-center gap-2">
                    <Badge size="sm" color="primary">React</Badge>
                    <span>18.0.0 or higher</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge size="sm" color="secondary">TypeScript</Badge>
                    <span>4.5.0 or higher (optional)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge size="sm" color="accent">Tailwind CSS</Badge>
                    <span>3.0.0 or higher</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case 'usage':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black font-mono text-neutral-900 mb-4">Usage</h1>
              <p className="text-lg font-mono text-neutral-700 mb-6">
                Learn how to use Positron-UI components in your application.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Basic Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-neutral-900 brutal-border rounded p-4 font-mono text-sm overflow-x-auto mb-4">
                  <pre className="text-green-400">
                    {codeExamples.usage}
                  </pre>
                </div>
                <div className="p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded border-2 border-dashed border-neutral-300">
                  <Card>
                    <CardContent>
                      <Button variant="solid" color="primary">
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'theming':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black font-mono text-neutral-900 mb-4">Theming</h1>
              <p className="text-lg font-mono text-neutral-700 mb-6">
                Customize Positron-UI to match your brand and design system with the powerful theming system.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Theme Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700 font-mono mb-4">
                  Positron-UI uses a centralized theming system via <code className="bg-yellow-100 px-2 py-1 rounded border">positron.config.ts</code>. 
                  This allows you to customize colors, typography, spacing, and animations across all components.
                </p>
                <div className="bg-neutral-900 brutal-border rounded p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-green-400">
                    {codeExamples.theming}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Color System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700 font-mono mb-4">
                  The brutalist design uses bold, flat colors with high contrast. Each color has multiple shades for different states.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['primary', 'secondary', 'accent', 'neutral'].map((color) => (
                    <div key={color} className="space-y-2">
                      <h4 className="font-bold font-mono text-sm uppercase">{color}</h4>
                      <div className="space-y-1">
                        {[100, 300, 500, 700, 900].map((shade) => (
                          <div 
                            key={shade}
                            className={`h-8 border-2 border-black rounded flex items-center justify-center text-xs font-mono font-bold ${
                              color === 'primary' ? 'bg-sky-' + shade + (shade >= 500 ? ' text-white' : ' text-black') :
                              color === 'secondary' ? 'bg-yellow-' + shade + ' text-black' :
                              color === 'accent' ? 'bg-pink-' + shade + (shade >= 500 ? ' text-white' : ' text-black') :
                              'bg-neutral-' + shade + (shade >= 500 ? ' text-white' : ' text-black')
                            }`}
                          >
                            {shade}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700 font-mono mb-4">
                  Positron-UI uses monospace fonts (IBM Plex Mono) for that authentic brutalist feel, with geometric sans-serif (Inter) for body text.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-neutral-50 border-2 border-black rounded">
                    <h3 className="text-2xl font-black font-mono mb-2">Headings - IBM Plex Mono Black</h3>
                    <p className="font-mono text-neutral-700">Used for all headings, buttons, and UI labels</p>
                  </div>
                  <div className="p-4 bg-neutral-50 border-2 border-black rounded">
                    <p className="text-base font-medium">Body Text - Inter Medium</p>
                    <p className="text-sm text-neutral-600 mt-1">Used for longer text content and descriptions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        // Component documentation
        const component = sectionId;
        const example = codeExamples[component as keyof typeof codeExamples];
        
        if (example) {
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black font-mono text-neutral-900 mb-4 capitalize">{component}</h1>
                <p className="text-lg font-mono text-neutral-700 mb-6">
                  A brutalist {component} component with customizable variants and animations.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-neutral-900 brutal-border rounded p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-400">
                      {example}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Reference</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-neutral-600">
                    See the TypeScript definitions for complete prop types and available options.
                  </p>
                </CardContent>
              </Card>
            </div>
          );
        }

        // Handle specific guide sections
        if (sectionId === 'customization') {
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black font-mono text-neutral-900 mb-4">Customization</h1>
                <p className="text-lg font-mono text-neutral-700 mb-6">
                  Learn how to customize and extend Positron-UI components to fit your needs.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Component Variants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 font-mono mb-4">
                    You can extend existing components with custom variants by modifying the component props or creating wrapper components.
                  </p>
                  <div className="bg-neutral-900 brutal-border rounded p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-400">{`// Custom Button with new variant
const CustomButton = ({ variant = 'neon', ...props }) => {
  const customVariants = {
    neon: 'bg-cyan-400 text-black border-black hover:bg-cyan-300',
    retro: 'bg-purple-600 text-yellow-300 border-yellow-300'
  };
  
  return (
    <Button 
      className={customVariants[variant]}
      {...props}
    />
  );
};`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>CSS Custom Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 font-mono mb-4">
                    Override CSS custom properties to change component styling globally.
                  </p>
                  <div className="bg-neutral-900 brutal-border rounded p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-400">{`:root {
  --positron-border-width: 3px;
  --positron-shadow: 6px 6px 0px 0px #000000;
  --positron-primary: #ff6b35;
  --positron-radius: 8px;
}`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Extending with Tailwind</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 font-mono mb-4">
                    Positron-UI is built with Tailwind CSS, so you can use utility classes to customize any component.
                  </p>
                  <div className="bg-neutral-900 brutal-border rounded p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-400">{`// Add custom styling with Tailwind classes
<Button className="rotate-2 hover:rotate-0 transition-transform">
  Tilted Button
</Button>

<Card className="bg-gradient-to-r from-pink-500 to-yellow-500">
  Gradient Card
</Card>`}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        }

        if (sectionId === 'typescript') {
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black font-mono text-neutral-900 mb-4">TypeScript</h1>
                <p className="text-lg font-mono text-neutral-700 mb-6">
                  Positron-UI is built with TypeScript and provides comprehensive type safety.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Type Definitions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 font-mono mb-4">
                    All components come with full TypeScript definitions out of the box.
                  </p>
                  <div className="bg-neutral-900 brutal-border rounded p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-400">{`import { ButtonProps, CardProps } from '@positron-ui/react';

// Extend component props
interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}

// Type-safe component usage
const MyComponent = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!');
  };

  return (
    <Button 
      variant="solid" // ✅ TypeScript knows valid variants
      color="primary"  // ✅ TypeScript knows valid colors
      onClick={handleClick}
    >
      Click me
    </Button>
  );
};`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generic Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 font-mono mb-4">
                    Some components like Table support generics for type-safe data handling.
                  </p>
                  <div className="bg-neutral-900 brutal-border rounded p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-400">{`interface User {
  id: number;
  name: string;
  email: string;
}

const columns: TableColumn<User>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' }
];

<Table<User> 
  columns={columns} 
  data={users} // ✅ Type-safe data
/>`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Theme Typing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 font-mono mb-4">
                    The theme configuration is fully typed for better development experience.
                  </p>
                  <div className="bg-neutral-900 brutal-border rounded p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-400">{`import { PositronTheme } from '@positron-ui/react';

const customTheme: PositronTheme = {
  colors: {
    primary: {
      500: '#custom-color', // ✅ Type-safe color definition
    }
  }
  // ... other theme properties
};`}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        }

        if (sectionId === 'accessibility') {
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black font-mono text-neutral-900 mb-4">Accessibility</h1>
                <p className="text-lg font-mono text-neutral-700 mb-6">
                  Positron-UI components are built with accessibility in mind, following WCAG guidelines.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Keyboard Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 font-mono mb-4">
                    All interactive components support keyboard navigation with standard patterns.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-neutral-50 border-2 border-black rounded">
                      <h4 className="font-bold font-mono mb-2">Focus Management</h4>
                      <ul className="text-sm font-mono space-y-1">
                        <li>• Tab to navigate</li>
                        <li>• Enter/Space to activate</li>
                        <li>• Escape to close modals</li>
                        <li>• Arrow keys for lists</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-neutral-50 border-2 border-black rounded">
                      <h4 className="font-bold font-mono mb-2">Visual Indicators</h4>
                      <ul className="text-sm font-mono space-y-1">
                        <li>• Clear focus outlines</li>
                        <li>• High contrast borders</li>
                        <li>• State change feedback</li>
                        <li>• Loading indicators</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Screen Reader Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 font-mono mb-4">
                    Components include proper ARIA attributes and semantic markup.
                  </p>
                  <div className="bg-neutral-900 brutal-border rounded p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-400">{`// Components include ARIA attributes automatically
<Button aria-label="Close dialog">×</Button>
<Modal aria-labelledby="modal-title" aria-modal="true">
<Select aria-expanded="false" aria-haspopup="listbox">
<Toast role="alert" aria-live="polite">`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Color Contrast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 font-mono mb-4">
                    The brutalist design ensures high contrast ratios for better readability.
                  </p>
                  <div className="space-y-2">
                    <Badge color="success">AA Compliant</Badge>
                    <Badge color="success">4.5:1 Minimum Ratio</Badge>
                    <Badge color="primary">Bold Visual Hierarchy</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold font-mono mb-2 text-green-600">✅ Do</h4>
                      <ul className="text-sm font-mono space-y-1">
                        <li>• Use semantic HTML</li>
                        <li>• Provide alt text for images</li>
                        <li>• Include form labels</li>
                        <li>• Test with screen readers</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold font-mono mb-2 text-red-600">❌ Don't</h4>
                      <ul className="text-sm font-mono space-y-1">
                        <li>• Rely only on color</li>
                        <li>• Remove focus indicators</li>
                        <li>• Use low contrast text</li>
                        <li>• Auto-play media</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-black font-mono text-neutral-900 mb-4">
              Documentation
            </h1>
            <p className="text-lg font-mono text-neutral-700">
              Select a section from the sidebar to view documentation.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-pink-50">
      {/* Header */}
      <header className="neo-brutal-card m-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-yellow-400 brutal-border rounded flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-mono text-neutral-900">DOCUMENTATION</h1>
              <p className="text-sm font-mono text-neutral-600">Complete Guide & API Reference</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" color="neutral" size="sm" leftIcon={<Github className="w-4 h-4" />}>
              GitHub
            </Button>
            <Button variant="solid" color="primary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Download
            </Button>
          </div>
        </div>
      </header>

      <div className="flex gap-4 m-4">
        {/* Sidebar */}
        <div className="w-80 neo-brutal-card p-6">
          <h2 className="text-lg font-black font-mono text-neutral-900 mb-4">Navigation</h2>
          <div className="space-y-4">
            {docSections.map((section) => (
              <div key={section.id}>
                <h3 className="text-sm font-bold font-mono text-neutral-800 mb-2 uppercase tracking-wide">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left p-2 rounded border-2 font-mono font-medium transition-all flex items-center justify-between group ${
                        activeSection === item.id
                          ? 'bg-sky-500 text-white border-black shadow-[2px_2px_0px_0px_#000000]'
                          : 'bg-white border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_#000000]'
                      }`}
                    >
                      <span>{item.title}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        activeSection === item.id ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Card variant="default" padding="lg" className="min-h-[600px]">
            {getContent(activeSection)}
          </Card>
        </div>
      </div>
    </div>
  );
}
