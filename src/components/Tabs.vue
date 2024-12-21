<template>
  <div class="tabs">
    <!-- Tabs Navigation -->
    <div class="tabs-navigation">
      <button
        v-for="(tab, index) in filteredTabs"
        :key="index"
        :class="['tab-button', { active: activeTab === index }]"
        @click="setActiveTab(index)"
      >
        {{ tab.title }}
      </button>
    </div>

    <!-- Tabs Content -->
    <div class="tabs-content">
      <div v-if="activeTab !== null">
        <!-- Texnik xususiyatlari -->
        <div v-if="activeTab === 1">
          <table class="tech-specs-table">
            <tbody>
              <tr v-for="(value, key) in techSpecs" :key="key">
                <td>{{ key }}</td>
                <td>{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Mahsulot haqida savollar -->
        <div v-else-if="activeTab === 2">
          <h4>Mahsulot haqida savolingiz bormi?</h4>
          <form @submit.prevent="submitQuestion" class="question-form">
            <input
              type="text"
              v-model="question"
              placeholder="Savolingizni bering"
              class="form-input"
              required
            />
            <input
              type="text"
              v-model="name"
              placeholder="Sizning ismingiz"
              class="form-input"
              required
            />
            <button type="submit" class="submit-button">So'rash</button>
          </form>
        </div>
        <!-- Default Tab Content -->
        <div v-else>
          <p>{{ filteredTabs[activeTab]?.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: {
    techSpecs: {
      type: Object, // Texnik xususiyatlar obyektini qabul qilish
      required: true,
    },
  },
  data() {
    return {
      activeTab: 0, // Default active tab
      tabs: [
        { title: "Tavsif", content: "Bu mahsulot haqida tavsif." },
        { title: "Texnik xususiyatlari", content: "" }, // Content is replaced with a table
        { title: "Mahsulot haqida savollar (0)", content: "" }, // Content is replaced with input form
      ],
      question: "", // Savol input maydoni
      name: "", // FIO input maydoni
    };
  },
  computed: {
    filteredTabs() {
      return this.tabs;
    },
  },
  methods: {
    setActiveTab(index) {
      this.activeTab = index;
    },
    submitQuestion() {
      if (this.question && this.name) {
        alert(`Savolingiz yuborildi: "${this.question}", FIO: "${this.name}"`);
        this.question = "";
        this.name = "";
      } else {
        alert("Iltimos, barcha maydonlarni to'ldiring!");
      }
    },
  },
};
</script>
  
  <style scoped>
  .tabs {
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: white;
    margin-top: 20px;
  }
  
  .tabs-navigation {
    display: flex;
    border-bottom: 1px solid #ddd;
    background-color: #f9f9f9;
  }
  
  .tab-button {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-right: 1px solid #ddd;
    transition: background-color 0.3s;
  }
  
  .tab-button:last-child {
    border-right: none;
  }
  
  .tab-button.active {
    color: #086c08;
    border-bottom: 1px solid #086c08;
    background-color: white;
  }
  
  .tab-button:hover {
    background-color: #f0f0f0;
  }
  
  .tabs-content {
    padding: 20px;
  }
  
  .tech-specs-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  .tech-specs-table td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  
  .tech-specs-table td:first-child {
    font-weight: bold;
  }
  
  .question-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .form-input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
  }
  
  .submit-button {
    padding: 10px 15px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: red;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: darkred;
  }
  @media screen and (max-width: 550px) {
.tab-button{
  font-size: 13px;
  font-weight: 400;
  padding: 5px;
}
.tabs-content{
  font-size: 13px;
}
  }
  </style>
  