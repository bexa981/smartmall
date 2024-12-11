<template>
    <div class="menu">
      <ul>
        <li v-for="(category, index) in categories" :key="index" class="menu-item">
          <!-- Menu Header -->
          <div
            class="menu-header flex justify-between items-center cursor-pointer p-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
            @click="toggleCategory(index)"
          >
            <span class="font-medium text-xs">{{ category.name }}</span>
            <span class="transition-transform text-xs duration-300" :class="{'rotate-180': activeCategory === index}">
              ▼
            </span>
          </div>
  
          <!-- Subcategories with Animation -->
          <transition name="fade-slide">
            <ul
              v-if="activeCategory === index"
              class="submenu pl-5 mt-2 space-y-2"
            >
              <li
                v-for="(subCategory, subIndex) in category.subCategories"
                :key="subIndex"
                class="submenu-item text-xs hover:text-green-600 cursor-pointer"
                @click="navigateToCategory(category.name, subCategory)"
              >
                {{ subCategory }}
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </div>
  </template>
  
  
<script>
export default {
  name: "CollapsibleMenu",
  data() {
    return {
      categories: [
        {
          name: "Kabellar",
          subCategories: [
            "AVVG | AVVGng",
            "AVBbShv | AVBbShvng",
            "VG | VGng",
            "VBbShv | VBbShvng",
            "SIP-2 | SIP-3 | SIP-4",
            "A | AS",
          ],
        },
        {
          name: "Simlar",
          subCategories: ["VVF", "VVFng", "BB6Sh"],
        },
        {
          name: "Elektrotexnika",
          subCategories: ["AC", "AS", "APB"],
        },
        {
          name: "Sport va hordiq",
          subCategories: ["TTP", "KGBF", "MKSh"],
        },
      ],
      activeCategory: null, // Tracks the currently active (expanded) category
    };
  },
  methods: {
    toggleCategory(index) {
      this.activeCategory = this.activeCategory === index ? null : index;
    },
    navigateToCategory(categoryName, subCategoryName) {
      console.log(`Navigating to: ${categoryName} -> ${subCategoryName}`);
    },
  },
};


</script>

<style scoped>
.menu {
  width: 300px;
  background-color: white;
  border: 1px solid #e5e7eb; /* Tailwind Gray 300 */
  border-radius: 8px;
  padding: 15px;
  height: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* Menu Header */
.menu-header {
  font-weight: bold;
  color: #1f2937; /* Tailwind Gray 800 */
}

/* Submenu Items */
.submenu {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.submenu-item {
  color: #374151; /* Tailwind Gray 700 */
  transition: color 0.3s ease;
}

/* Transition Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
