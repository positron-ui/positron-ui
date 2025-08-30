import { useState } from 'react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Input,
  Badge,
  Alert,
  Checkbox,
  Switch,
  Progress,
  Avatar,
  Spinner,
  ToastContainer,
  Select,
  Modal,
  ModalHeader,
  ModalFooter,
  Tabs,
  TabsContent,
  Accordion,
  Table,
  Textarea,
  Dropdown,
  Slider,
  RadioGroup,
  Tooltip,
  Pagination,
  Breadcrumb,
  DatePicker,
  FileUpload,
  Stepper,
  Popover,
  Skeleton,
  SkeletonCard
} from '@/positron';
import { Play, Settings, User } from 'lucide-react';

const components = [
  'Button',
  'Card',
  'Input', 
  'Badge',
  'Alert',
  'Checkbox',
  'Switch',
  'Progress',
  'Avatar',
  'Spinner',
  'Toast',
  'Select',
  'Modal',
  'Tabs',
  'Accordion',
  'Table',
  'Textarea',
  'Dropdown',
  'Slider',
  'RadioGroup',
  'Tooltip',
  'Pagination',
  'Breadcrumb',
  'DatePicker',
  'FileUpload',
  'Stepper',
  'Popover',
  'Skeleton'
];

export default function Playground() {
  const [selectedComponent, setSelectedComponent] = useState('Button');
  const [toasts, setToasts] = useState<any[]>([]);

  // Button props
  const [buttonVariant, setButtonVariant] = useState<'solid' | 'outline' | 'ghost'>('solid');
  const [buttonColor, setButtonColor] = useState<'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error'>('primary');
  const [buttonSize, setButtonSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [buttonLoading, setButtonLoading] = useState(false);

  // Card props
  const [cardVariant, setCardVariant] = useState<'default' | 'elevated' | 'outline'>('default');
  const [cardPadding, setCardPadding] = useState<'none' | 'sm' | 'md' | 'lg'>('md');

  // Alert props
  const [alertVariant, setAlertVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [alertClosable, setAlertClosable] = useState(true);

  // Progress props
  const [progressValue, setProgressValue] = useState(65);
  const [progressColor, setProgressColor] = useState<'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'>('primary');

  // Avatar props
  const [avatarSize, setAvatarSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [avatarColor, setAvatarColor] = useState<'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error'>('primary');

  // Spinner props
  const [spinnerSize, setSpinnerSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [spinnerVariant, setSpinnerVariant] = useState<'circular' | 'dots' | 'square'>('circular');

  // Modal props
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Select props
  const selectOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
  ];

  // Tabs props
  const tabItems = [
    { value: 'tab1', label: 'Overview' },
    { value: 'tab2', label: 'Details', badge: 'New' },
    { value: 'tab3', label: 'Settings' },
  ];

  // Accordion props
  const accordionItems = [
    {
      id: 'item-1',
      title: 'Getting Started',
      content: 'Learn the basics of our platform with this comprehensive guide.'
    },
    {
      id: 'item-2',
      title: 'Advanced Features',
      content: 'Explore powerful advanced capabilities and customization options.'
    },
    {
      id: 'item-3',
      title: 'API Reference',
      content: 'Complete API documentation with examples and best practices.'
    }
  ];

  // Table props
  const tableColumns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    { 
      key: 'actions', 
      header: 'Actions',
      render: () => <Button size="sm" color="accent">Edit</Button>
    }
  ];

  const tableData = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
  ];

  // Dropdown props
  const dropdownItems = [
    { value: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { value: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    { value: 'separator', label: '', separator: true },
    { value: 'logout', label: 'Log Out', icon: <Play className="w-4 h-4" /> },
  ];

  // RadioGroup props
  const radioOptions = [
    { value: 'small', label: 'Small', description: 'Perfect for personal use' },
    { value: 'medium', label: 'Medium', description: 'Great for small teams' },
    { value: 'large', label: 'Large', description: 'Best for organizations' },
  ];

  // Slider props
  const [sliderValue, setSliderValue] = useState(65);

  // Pagination props
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  // Breadcrumb props
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Users', href: '/users' },
    { label: 'Profile' }
  ];

  // DatePicker props
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // FileUpload props
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  // Stepper props
  const [currentStepperStep, setCurrentStepperStep] = useState(1);
  const stepperSteps = [
    { id: 'step1', title: 'Personal Info', description: 'Enter your details' },
    { id: 'step2', title: 'Preferences', description: 'Set your preferences' },
    { id: 'step3', title: 'Review', description: 'Review and confirm' },
    { id: 'step4', title: 'Complete', description: 'Setup complete' }
  ];

  // Popover props
  const [popoverPlacement, setPopoverPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');
  const [popoverSize, setPopoverSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [popoverVariant, setPopoverVariant] = useState<'default' | 'brutal'>('default');

  // Skeleton props
  const [skeletonVariant, setSkeletonVariant] = useState<'rectangular' | 'circular' | 'text' | 'avatar'>('text');
  const [skeletonSize, setSkeletonSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [skeletonLines, setSkeletonLines] = useState(3);
  const [skeletonAnimated, setSkeletonAnimated] = useState(true);
  const [skeletonBrutal, setSkeletonBrutal] = useState(false);

  const addToast = () => {
    const id = Date.now().toString();
    const variants = ['info', 'success', 'warning', 'error'] as const;
    const variant = variants[Math.floor(Math.random() * variants.length)];
    
    setToasts(prev => [...prev, {
      id,
      title: 'Test Toast',
      description: 'This is a test toast notification.',
      variant,
      onClose: (toastId: string) => {
        setToasts(prev => prev.filter(t => t.id !== toastId));
      }
    }]);
  };

  const renderComponentPreview = () => {
    switch (selectedComponent) {
      case 'Button':
        return (
          <Button
            variant={buttonVariant}
            color={buttonColor}
            size={buttonSize}
            isLoading={buttonLoading}
            leftIcon={<Play className="w-4 h-4" />}
            onClick={() => setButtonLoading(!buttonLoading)}
          >
            Click Me
          </Button>
        );

      case 'Card':
        return (
          <Card variant={cardVariant} padding={cardPadding} className="max-w-sm">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              This is a sample card component with customizable variants and padding.
            </CardContent>
          </Card>
        );

      case 'Input':
        return (
          <Input
            placeholder="Enter text..."
            label="Sample Input"
            helperText="This is a helper text"
            leftIcon={<User className="w-4 h-4" />}
          />
        );

      case 'Badge':
        return (
          <div className="flex gap-2 flex-wrap">
            <Badge variant="solid" color="primary">Primary</Badge>
            <Badge variant="outline" color="secondary">Secondary</Badge>
            <Badge variant="soft" color="success">Success</Badge>
          </div>
        );

      case 'Alert':
        return (
          <Alert
            variant={alertVariant}
            title="Alert Title"
            closable={alertClosable}
            onClose={() => console.log('Alert closed')}
          >
            This is an alert message with customizable variants.
          </Alert>
        );

      case 'Checkbox':
        return (
          <div className="space-y-4">
            <Checkbox label="Default checkbox" />
            <Checkbox label="Checked checkbox" defaultChecked />
            <Checkbox label="Indeterminate checkbox" indeterminate />
          </div>
        );

      case 'Switch':
        return (
          <div className="space-y-4">
            <Switch label="Default switch" />
            <Switch label="Checked switch" defaultChecked />
            <Switch label="Large switch" size="lg" />
          </div>
        );

      case 'Progress':
        return (
          <div className="w-full max-w-sm space-y-4">
            <Progress
              value={progressValue}
              color={progressColor}
              label="Progress"
              showValue
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>-10</Button>
              <Button size="sm" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>+10</Button>
            </div>
          </div>
        );

      case 'Avatar':
        return (
          <div className="flex gap-4 items-center">
            <Avatar size={avatarSize} color={avatarColor} fallback="JD" />
            <Avatar size={avatarSize} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User" />
            <Avatar size={avatarSize} color={avatarColor} />
          </div>
        );

      case 'Spinner':
        return (
          <div className="flex gap-8 items-center">
            <Spinner size={spinnerSize} variant="circular" />
            <Spinner size={spinnerSize} variant="dots" />
            <Spinner size={spinnerSize} variant="square" />
          </div>
        );

      case 'Toast':
        return (
          <div>
            <Button onClick={addToast}>Show Toast</Button>
            <ToastContainer toasts={toasts} />
          </div>
        );

      case 'Select':
        return (
          <Select
            options={selectOptions}
            placeholder="Choose a fruit..."
            label="Favorite Fruit"
            helperText="Select your preferred option"
          />
        );

      case 'Modal':
        return (
          <div>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            <Modal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)}
              title="Sample Modal"
              size="md"
            >
              <ModalHeader>
                <p className="font-mono text-neutral-700">
                  This is a sample modal dialog with brutalist styling.
                </p>
              </ModalHeader>
              <ModalFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>
                  Confirm
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        );

      case 'Tabs':
        return (
          <Tabs items={tabItems} defaultValue="tab1">
            <TabsContent value="tab1">
              <Card padding="sm">
                <CardContent>Overview content goes here with all the important information.</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab2">
              <Card padding="sm">
                <CardContent>Details content with additional information and new features.</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab3">
              <Card padding="sm">
                <CardContent>Settings and configuration options are displayed here.</CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        );

      case 'Accordion':
        return (
          <Accordion items={accordionItems} type="single" collapsible />
        );

      case 'Table':
        return (
          <Table 
            columns={tableColumns} 
            data={tableData}
            caption="User Management"
            variant="striped"
            hoverable
          />
        );

      case 'Textarea':
        return (
          <Textarea
            placeholder="Enter your message here..."
            label="Message"
            helperText="Maximum 500 characters"
            rows={4}
          />
        );

      case 'Dropdown':
        return (
          <Dropdown
            trigger={
              <Button variant="outline">
                <User className="w-4 h-4 mr-2" />
                Account
              </Button>
            }
            items={dropdownItems}
            onSelect={(value) => console.log('Selected:', value)}
          />
        );

      case 'Slider':
        return (
          <div className="w-full max-w-sm">
            <Slider
              value={sliderValue}
              onChange={setSliderValue}
              label="Volume"
              showValue
              min={0}
              max={100}
              color="primary"
            />
          </div>
        );

      case 'RadioGroup':
        return (
          <RadioGroup
            options={radioOptions}
            label="Choose your plan"
            defaultValue="medium"
          />
        );

      case 'Tooltip':
        return (
          <div className="flex gap-4">
            <Tooltip content="This is a helpful tooltip">
              <Button>Hover me</Button>
            </Tooltip>
            <Tooltip content="Click to toggle" trigger="click" placement="bottom">
              <Button variant="outline">Click me</Button>
            </Tooltip>
          </div>
        );

      case 'Pagination':
        return (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showFirstLast={true}
            siblingCount={1}
          />
        );

      case 'Breadcrumb':
        return (
          <Breadcrumb
            items={breadcrumbItems}
            showHome={true}
            variant="default"
          />
        );

      case 'DatePicker':
        return (
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date || undefined)}
            placeholder="Select a date..."
            label="Date Selection"
            helperText="Choose any date"
          />
        );

      case 'FileUpload':
        return (
          <FileUpload
            onFilesChange={setUploadedFiles}
            onFileRemove={(id) => setUploadedFiles(prev => prev.filter(f => f.id !== id))}
            accept="image/*"
            multiple={true}
            maxFiles={3}
            showPreview={true}
            variant="default"
          />
        );

      case 'Stepper':
        return (
          <div className="w-full max-w-2xl">
            <Stepper
              steps={stepperSteps}
              currentStep={currentStepperStep}
              completedSteps={Array.from({ length: currentStepperStep }, (_, i) => i)}
              orientation="horizontal"
              clickable={true}
              onStepClick={setCurrentStepperStep}
              variant="default"
            />
            <div className="mt-4 flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setCurrentStepperStep(Math.max(0, currentStepperStep - 1))}
                disabled={currentStepperStep === 0}
              >
                Previous
              </Button>
              <Button 
                size="sm"
                onClick={() => setCurrentStepperStep(Math.min(stepperSteps.length - 1, currentStepperStep + 1))}
                disabled={currentStepperStep === stepperSteps.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 'Popover':
        return (
          <Popover
            trigger={
              <Button variant="solid" color="primary">
                <Settings className="w-4 h-4 mr-2" />
                Open Popover
              </Button>
            }
            content={
              <div className="space-y-3">
                <h3 className="font-mono font-bold text-lg">Popover Content</h3>
                <p className="text-sm">This is a sample popover with customizable placement and styling.</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Action 1</Button>
                  <Button size="sm" color="accent">Action 2</Button>
                </div>
              </div>
            }
            placement={popoverPlacement}
            size={popoverSize}
            variant={popoverVariant}
            arrow={true}
          />
        );

      case 'Skeleton':
        return (
          <div className="space-y-6 w-full max-w-md">
            <div className="space-y-3">
              <h3 className="font-mono font-bold">Individual Skeletons</h3>
              <Skeleton 
                variant={skeletonVariant}
                size={skeletonSize}
                lines={skeletonVariant === 'text' ? skeletonLines : 1}
                animated={skeletonAnimated}
                brutal={skeletonBrutal}
              />
            </div>
            
            <div className="space-y-3">
              <h3 className="font-mono font-bold">Skeleton Card</h3>
              <SkeletonCard 
                includeAvatar={true}
                includeImage={true}
                lines={3}
                brutal={skeletonBrutal}
              />
            </div>
          </div>
        );

      default:
        return <div>Component not found</div>;
    }
  };

  const renderControls = () => {
    switch (selectedComponent) {
      case 'Button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Variant</label>
              <div className="flex gap-2">
                {['solid', 'outline', 'ghost'].map((variant) => (
                  <Button
                    key={variant}
                    size="sm"
                    variant={buttonVariant === variant ? 'solid' : 'outline'}
                    onClick={() => setButtonVariant(variant as any)}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Color</label>
              <div className="flex gap-2 flex-wrap">
                {['primary', 'secondary', 'accent', 'neutral', 'success', 'warning', 'error'].map((color) => (
                  <Button
                    key={color}
                    size="sm"
                    variant={buttonColor === color ? 'solid' : 'outline'}
                    onClick={() => setButtonColor(color as any)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Size</label>
              <div className="flex gap-2">
                {['sm', 'md', 'lg'].map((size) => (
                  <Button
                    key={size}
                    size="sm"
                    variant={buttonSize === size ? 'solid' : 'outline'}
                    onClick={() => setButtonSize(size as any)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Variant</label>
              <div className="flex gap-2">
                {['default', 'elevated', 'outline'].map((variant) => (
                  <Button
                    key={variant}
                    size="sm"
                    variant={cardVariant === variant ? 'solid' : 'outline'}
                    onClick={() => setCardVariant(variant as any)}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Padding</label>
              <div className="flex gap-2">
                {['none', 'sm', 'md', 'lg'].map((padding) => (
                  <Button
                    key={padding}
                    size="sm"
                    variant={cardPadding === padding ? 'solid' : 'outline'}
                    onClick={() => setCardPadding(padding as any)}
                  >
                    {padding}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Alert':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Variant</label>
              <div className="flex gap-2">
                {['info', 'success', 'warning', 'error'].map((variant) => (
                  <Button
                    key={variant}
                    size="sm"
                    variant={alertVariant === variant ? 'solid' : 'outline'}
                    onClick={() => setAlertVariant(variant as any)}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Switch 
                label="Closable" 
                checked={alertClosable}
                onChange={(e) => setAlertClosable(e.target.checked)}
              />
            </div>
          </div>
        );

      case 'Progress':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Value: {progressValue}</label>
              <input
                type="range"
                min="0"
                max="100"
                value={progressValue}
                onChange={(e) => setProgressValue(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Color</label>
              <div className="flex gap-2 flex-wrap">
                {['primary', 'secondary', 'accent', 'success', 'warning', 'error'].map((color) => (
                  <Button
                    key={color}
                    size="sm"
                    variant={progressColor === color ? 'solid' : 'outline'}
                    onClick={() => setProgressColor(color as any)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Avatar':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Size</label>
              <div className="flex gap-2">
                {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                  <Button
                    key={size}
                    size="sm"
                    variant={avatarSize === size ? 'solid' : 'outline'}
                    onClick={() => setAvatarSize(size as any)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Color</label>
              <div className="flex gap-2 flex-wrap">
                {['primary', 'secondary', 'accent', 'neutral', 'success', 'warning', 'error'].map((color) => (
                  <Button
                    key={color}
                    size="sm"
                    variant={avatarColor === color ? 'solid' : 'outline'}
                    onClick={() => setAvatarColor(color as any)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Spinner':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Size</label>
              <div className="flex gap-2">
                {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                  <Button
                    key={size}
                    size="sm"
                    variant={spinnerSize === size ? 'solid' : 'outline'}
                    onClick={() => setSpinnerSize(size as any)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Variant</label>
              <div className="flex gap-2">
                {['circular', 'dots', 'square'].map((variant) => (
                  <Button
                    key={variant}
                    size="sm"
                    variant={spinnerVariant === variant ? 'solid' : 'outline'}
                    onClick={() => setSpinnerVariant(variant as any)}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Pagination':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Current Page: {currentPage}</label>
              <input
                type="range"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="text-sm font-mono text-neutral-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        );

      case 'DatePicker':
        return (
          <div className="space-y-4">
            <div className="text-sm font-mono">
              <strong>Selected Date:</strong> {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setSelectedDate(new Date())}
            >
              Set to Today
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setSelectedDate(undefined)}
            >
              Clear Date
            </Button>
          </div>
        );

      case 'FileUpload':
        return (
          <div className="space-y-4">
            <div className="text-sm font-mono">
              <strong>Files:</strong> {uploadedFiles.length} uploaded
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setUploadedFiles([])}
              disabled={uploadedFiles.length === 0}
            >
              Clear All Files
            </Button>
          </div>
        );

      case 'Stepper':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Current Step: {currentStepperStep + 1}</label>
              <input
                type="range"
                min="0"
                max={stepperSteps.length - 1}
                value={currentStepperStep}
                onChange={(e) => setCurrentStepperStep(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="text-sm font-mono text-neutral-600">
              Step {currentStepperStep + 1} of {stepperSteps.length}: {stepperSteps[currentStepperStep]?.title}
            </div>
          </div>
        );

      case 'Popover':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Placement</label>
              <div className="flex gap-2">
                {['top', 'bottom', 'left', 'right'].map((placement) => (
                  <Button
                    key={placement}
                    size="sm"
                    variant={popoverPlacement === placement ? 'solid' : 'outline'}
                    onClick={() => setPopoverPlacement(placement as any)}
                  >
                    {placement}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Size</label>
              <div className="flex gap-2">
                {['sm', 'md', 'lg'].map((size) => (
                  <Button
                    key={size}
                    size="sm"
                    variant={popoverSize === size ? 'solid' : 'outline'}
                    onClick={() => setPopoverSize(size as any)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Variant</label>
              <div className="flex gap-2">
                {['default', 'brutal'].map((variant) => (
                  <Button
                    key={variant}
                    size="sm"
                    variant={popoverVariant === variant ? 'solid' : 'outline'}
                    onClick={() => setPopoverVariant(variant as any)}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Skeleton':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Variant</label>
              <div className="grid grid-cols-2 gap-2">
                {['rectangular', 'circular', 'text', 'avatar'].map((variant) => (
                  <Button
                    key={variant}
                    size="sm"
                    variant={skeletonVariant === variant ? 'solid' : 'outline'}
                    onClick={() => setSkeletonVariant(variant as any)}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-mono font-bold mb-2">Size</label>
              <div className="grid grid-cols-2 gap-2">
                {['sm', 'md', 'lg', 'xl'].map((size) => (
                  <Button
                    key={size}
                    size="sm"
                    variant={skeletonSize === size ? 'solid' : 'outline'}
                    onClick={() => setSkeletonSize(size as any)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            {skeletonVariant === 'text' && (
              <div>
                <label className="block text-sm font-mono font-bold mb-2">Lines: {skeletonLines}</label>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={skeletonLines}
                  onChange={(e) => setSkeletonLines(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
            <div className="space-y-2">
              <Switch 
                label="Animated" 
                checked={skeletonAnimated}
                onChange={(e) => setSkeletonAnimated(e.target.checked)}
              />
              <Switch 
                label="Brutal Style" 
                checked={skeletonBrutal}
                onChange={(e) => setSkeletonBrutal(e.target.checked)}
              />
            </div>
          </div>
        );

      default:
        return <div className="text-neutral-600 font-mono">No controls available for this component.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-pink-50">
      {/* Header */}
      <header className="neo-brutal-card m-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-yellow-400 brutal-border rounded flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-mono text-neutral-900">PLAYGROUND</h1>
              <p className="text-sm font-mono text-neutral-600">Interactive Component Testing</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex gap-4 m-4">
        {/* Sidebar */}
        <div className="w-64 neo-brutal-card p-6">
          <h2 className="text-lg font-black font-mono text-neutral-900 mb-4">Components</h2>
          <div className="space-y-2">
            {components.map((component) => (
              <button
                key={component}
                onClick={() => setSelectedComponent(component)}
                className={`w-full text-left p-2 rounded border-2 font-mono font-medium transition-all ${
                  selectedComponent === component
                    ? 'bg-sky-500 text-white border-black shadow-[2px_2px_0px_0px_#000000]'
                    : 'bg-white border-neutral-300 hover:border-black hover:shadow-[2px_2px_0px_0px_#000000]'
                }`}
              >
                {component}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Preview */}
          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle>{selectedComponent} Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[200px] flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 rounded border-2 border-dashed border-neutral-300">
                {renderComponentPreview()}
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent>
              {renderControls()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
