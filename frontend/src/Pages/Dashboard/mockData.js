// src/Pages/Dashboard/mockData.js
const mockData = {
  products: [
    { id: 1, name: 'Traditional Inabel Blanket', price: 2500, status: 'Active' },
    { id: 2, name: 'Kalinga Geometric Scarf', price: 1800, status: 'Active' }
  ],
  videos: [
    { id: 1, title: "Voices of the Loom: Elena's Story", duration: '15 min', status: 'Published' }
  ],
  infographics: [
    { id: 1, title: 'Weaving Patterns Guide', views: 1250, status: 'Published' }
  ],
  fundraising: [
    { id: 1, title: 'Emergency Support for Weaver Families', raised: 125000, goal: 200000, status: 'Active' }
  ],
  orders: [
    { id: 1, customer: 'John Doe', total: 4300, status: 'Pending' }
  ]
};

export default mockData;
