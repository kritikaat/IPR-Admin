// api.js

// Dummy data for forms
const forms = [
    {
      id: 1,
      title: "Visitor's Form",
      responses: 50,
      edited: 2, // days ago
    },
    {
      id: 2,
      title: "Application Form For Science Fair",
      responses: 120,
      edited: 5, // days ago
    },
    {
      id: 3,
      title: "Exhibition Form",
      responses: 80,
      edited: 3, // days ago
    },
    {
      id: 4,
      title: "Feedback Form",
      responses: 80,
      edited: 3, // days ago
    }
  ];
  
  // Dummy responses for form with id 1 (Customer Feedback Form)
  const formResponses = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john.doe@example.com",
      message: "Great product! Loved the service.",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      message: "Good experience, but shipping was delayed.",
    },
  ];
  
  // Dummy analytics data
  const analyticsData = {
    totalViews: 2000,
    totalSubmissions: 170,
    uniqueVisitors: 1500,
    avgSubmitTime: "2 min 30 sec",
    chartData: [
      { day: "Monday", submissions: 20 },
      { day: "Tuesday", submissions: 30 },
      { day: "Wednesday", submissions: 40 },
      { day: "Thursday", submissions: 50 },
      { day: "Friday", submissions: 30 },
    ],
  };
  
  // Fetch forms data
  export const fetchForms = async () => {
    // Simulate API delay with setTimeout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(forms);
      }, 500); // Simulating network delay
    });
  };
  
  // Fetch form responses based on the form ID
  export const fetchResponses = async (formId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (formId === 1) {
          resolve(formResponses); // Returning the responses for form with id 1
        } else {
          resolve([]); // No responses for other forms in this dummy data
        }
      }, 500);
    });
  };
  
  // Publish form and return link and embed code
  export const publishForm = async (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const formLink = `https://myform.com/forms/${formData.title.toLowerCase().replace(/ /g, '-')}`;
        const embedCode = `<iframe src="${formLink}" width="600" height="400"></iframe>`;
        resolve({ link: formLink, embedCode });
      }, 500);
    });
  };
  
  // Fetch analytics data
  export const fetchAnalyticsData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(analyticsData); // Returning dummy analytics data
      }, 500);
    });
  };
  