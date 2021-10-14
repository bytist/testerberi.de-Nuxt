<template>
    <div id="filter-sidebar">
        <div class="rounded bg-tb-primary py-5">
            <div v-if="filterTags.length" class="mb-5 px-4">
                <div class="flex justify-between items-center">
                    <p class="text-tb-black font-normal text-base">
                        Clear Filters
                    </p>
                    <p @click="handleClearAll" class="text-sm text-tb-blue font-normal cursor-pointer">
                        Clear all
                    </p>
                </div>
                <div class="flex gap-1 flex-wrap mt-3">
                    <div
                        class="rounded-full bg-tb-blue hover:bg-tb-blue-dark transition duration-75 cursor-pointer py-1 px-3"
                        v-for="(item, index) in filterTags"
                        :key="index"
                    >
                        <div class="flex py-px">
                            <p class="text-white text-sm mb-0 pr-px">
                                {{ item.item.name }}
                            </p>
                            <p @click="handleTagRemove(item)" class="text-white text-sm ml-1 pl-px mb-0">
                                &times;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-tb-black font-normal text-base mb-5 px-4">
                Filter by
            </p>
            <div class="price-range-wrapper">
                <div class="accordion">
                    <div
                        class="
                            accordion-nav
                            flex
                            justify-between
                            gap-5
                            items-center
                            px-4
                            select-none
                            py-2
                        "
                    >
                        <span
                            @click="
                                priceAccordionActive = !priceAccordionActive
                            "
                            class="flex items-center cursor-pointer w-full"
                        >
                            <img
                                src="~/assets/images/accordion-arrow.svg"
                                alt
                                v-bind:class="
                                    priceAccordionActive ? 'rotate-90' : ''
                                "
                                class="transition duration-200 transform"
                            />
                            <span class="text-tb-black ml-2">Price Range</span>
                        </span>
                    </div>
                    <transition name="fade">
                        <div
                            v-if="priceAccordionActive"
                            class="
                                accordion-content
                                h-32
                                px-4
                                overflow-y-hidden
                            "
                        >
                            <div class="content-wrapper py-4 w-full relative">
                                <div
                                    class="
                                        flex
                                        justify-between
                                        items-center
                                        mb-5
                                    "
                                >
                                    <div class="price-range-input relative">
                                        <div
                                            class="
                                                absolute
                                                h-full
                                                flex flex-col
                                                justify-center
                                                gap-2
                                                number-input-control
                                            "
                                        >
                                            <div
                                                :class="
                                                    priceRangeObjectValue[0] <
                                                    priceRange.max
                                                        ? ''
                                                        : 'invisible'
                                                "
                                                class="cursor-pointer"
                                                @mousedown="
                                                    handleMouseDown(1, 0)
                                                "
                                                @mouseup="handleMouseUp"
                                            >
                                                <svg
                                                    width="11"
                                                    height="7"
                                                    viewBox="0 0 11 7"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M5.22509 0.999173L5.2251 0.999165C5.42156 0.800273 5.74082 0.800285 5.93729 0.999157L5.9373 0.999173L10.1701 5.28501L10.1701 5.28502C10.3655 5.4829 10.3655 5.80292 10.1701 6.00081L10.1701 6.00083C9.97364 6.19972 9.65436 6.19972 9.45791 6.00083L9.4579 6.00083L5.5812 2.07556L1.7045 6.00083L1.70267 6.00267L1.70266 6.00266C1.50768 6.19336 1.19781 6.19335 1.00282 6.00267L5.22509 0.999173ZM5.22509 0.999173L0.992288 5.28501L0.992272 5.28499M5.22509 0.999173L0.992272 5.28499M0.992272 5.28499L0.99047 5.28688M0.992272 5.28499L0.99047 5.28688M0.99047 5.28688C0.798503 5.48814 0.803937 5.80818 1.00282 6.00267L0.99047 5.28688Z"
                                                        fill="#7891A6"
                                                        stroke="#7891A6"
                                                        stroke-width="0.3"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                :class="
                                                    priceRangeObjectValue[0] >
                                                    priceRange.min
                                                        ? ''
                                                        : 'invisible'
                                                "
                                                class="cursor-pointer"
                                                @mousedown="
                                                    handleMouseDown(-1, 0)
                                                "
                                                @mouseup="handleMouseUp"
                                            >
                                                <svg
                                                    width="11"
                                                    height="7"
                                                    viewBox="0 0 11 7"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M5.94159 6.00083L5.94159 6.00083C5.74513 6.19973 5.42587 6.19971 5.2294 6.00084L5.22939 6.00083L0.99658 1.71499L0.996572 1.71498C0.801167 1.5171 0.801178 1.19708 0.996564 0.999189L0.996588 0.999165C1.19304 0.800278 1.51232 0.800278 1.70878 0.999165L1.70879 0.999173L5.58549 4.92444L9.46219 0.999173L9.46402 0.997326L9.46403 0.997342C9.65901 0.806637 9.96888 0.806648 10.1639 0.997332L5.94159 6.00083ZM5.94159 6.00083L10.1744 1.71499L10.1744 1.71501M5.94159 6.00083L10.1744 1.71501M10.1744 1.71501L10.1762 1.71312M10.1744 1.71501L10.1762 1.71312M10.1762 1.71312C10.3682 1.51186 10.3628 1.19182 10.1639 0.997334L10.1762 1.71312Z"
                                                        fill="#7891A6"
                                                        stroke="#7891A6"
                                                        stroke-width="0.3"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <currency-input
                                            v-model="priceRangeObjectValue[0]"
                                            currency="EUR"
                                            :precision="0"
                                            class="
                                                w-full
                                                form-input
                                                rounded-full
                                                border-transparent
                                                px-4
                                                py-3
                                                placeholder-tb-primary-dark
                                            "
                                            :placeholder="'€ ' + priceRange.min"
                                            @input="clearErrorMsg"
                                            @blur="
                                                $emit(
                                                    'applyPriceRange',
                                                    priceRangeObjectValue
                                                )
                                            "
                                        />
                                    </div>
                                    <span class="text-tb-black font-extrabold"
                                        >-</span
                                    >
                                    <div class="price-range-input relative">
                                        <div
                                            class="
                                                absolute
                                                h-full
                                                flex flex-col
                                                justify-center
                                                gap-2
                                                number-input-control
                                            "
                                        >
                                            <div
                                                :class="
                                                    priceRangeObjectValue[1] <
                                                    priceRange.max
                                                        ? ''
                                                        : 'invisible'
                                                "
                                                class="cursor-pointer"
                                                @mousedown="
                                                    handleMouseDown(1, 1)
                                                "
                                                @mouseup="handleMouseUp"
                                            >
                                                <svg
                                                    width="11"
                                                    height="7"
                                                    viewBox="0 0 11 7"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M5.22509 0.999173L5.2251 0.999165C5.42156 0.800273 5.74082 0.800285 5.93729 0.999157L5.9373 0.999173L10.1701 5.28501L10.1701 5.28502C10.3655 5.4829 10.3655 5.80292 10.1701 6.00081L10.1701 6.00083C9.97364 6.19972 9.65436 6.19972 9.45791 6.00083L9.4579 6.00083L5.5812 2.07556L1.7045 6.00083L1.70267 6.00267L1.70266 6.00266C1.50768 6.19336 1.19781 6.19335 1.00282 6.00267L5.22509 0.999173ZM5.22509 0.999173L0.992288 5.28501L0.992272 5.28499M5.22509 0.999173L0.992272 5.28499M0.992272 5.28499L0.99047 5.28688M0.992272 5.28499L0.99047 5.28688M0.99047 5.28688C0.798503 5.48814 0.803937 5.80818 1.00282 6.00267L0.99047 5.28688Z"
                                                        fill="#7891A6"
                                                        stroke="#7891A6"
                                                        stroke-width="0.3"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                :class="
                                                    priceRangeObjectValue[1] >
                                                    priceRange.min
                                                        ? ''
                                                        : 'invisible'
                                                "
                                                class="cursor-pointer"
                                                @mousedown="
                                                    handleMouseDown(-1, 1)
                                                "
                                                @mouseup="handleMouseUp"
                                            >
                                                <svg
                                                    width="11"
                                                    height="7"
                                                    viewBox="0 0 11 7"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M5.94159 6.00083L5.94159 6.00083C5.74513 6.19973 5.42587 6.19971 5.2294 6.00084L5.22939 6.00083L0.99658 1.71499L0.996572 1.71498C0.801167 1.5171 0.801178 1.19708 0.996564 0.999189L0.996588 0.999165C1.19304 0.800278 1.51232 0.800278 1.70878 0.999165L1.70879 0.999173L5.58549 4.92444L9.46219 0.999173L9.46402 0.997326L9.46403 0.997342C9.65901 0.806637 9.96888 0.806648 10.1639 0.997332L5.94159 6.00083ZM5.94159 6.00083L10.1744 1.71499L10.1744 1.71501M5.94159 6.00083L10.1744 1.71501M10.1744 1.71501L10.1762 1.71312M10.1744 1.71501L10.1762 1.71312M10.1762 1.71312C10.3682 1.51186 10.3628 1.19182 10.1639 0.997334L10.1762 1.71312Z"
                                                        fill="#7891A6"
                                                        stroke="#7891A6"
                                                        stroke-width="0.3"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <currency-input
                                            v-model="priceRangeObjectValue[1]"
                                            currency="EUR"
                                            :precision="0"
                                            class="
                                                w-full
                                                form-input
                                                rounded-full
                                                border-transparent
                                                px-4
                                                py-3
                                                placeholder-tb-primary-dark
                                            "
                                            :placeholder="
                                                '€ ' + priceRange.max + '+'
                                            "
                                            @input="clearErrorMsg"
                                            @blur="
                                                $emit(
                                                    'applyPriceRange',
                                                    priceRangeObjectValue
                                                )
                                            "
                                        />
                                    </div>
                                </div>
                                <div class="flex justify-center w-full px-4">
                                    <client-only>
                                        <vue-slider
                                            v-model="priceRangeObjectValue"
                                            :dotOptions="priceRangeOptions"
                                            width="100%"
                                            :min="slidePriceRange.min || 0"
                                            :max="slidePriceRange.max || 10000"
                                            :enableCross="false"
                                            @drag-end="
                                                $emit(
                                                    'applyPriceRange',
                                                    priceRangeObjectValue
                                                )
                                            "
                                            :clickable="false"
                                            contained="true"
                                            dotSize="20"
                                        ></vue-slider>
                                    </client-only>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div
                    v-for="(item, index) in filtersArray"
                    :key="index"
                    class="accordion"
                >
                    <div
                        class="
                            accordion-nav
                            flex
                            justify-between
                            gap-5
                            items-center
                            px-4
                            select-none
                            py-2
                        "
                    >
                        <span
                            @click="
                                $set(
                                    accordionActive,
                                    index,
                                    !accordionActive[index]
                                )
                            "
                            class="flex items-center cursor-pointer w-full"
                        >
                            <img
                                src="~/assets/images/accordion-arrow.svg"
                                alt
                                v-bind:class="
                                    accordionActive[index] ? 'rotate-90' : ''
                                "
                                class="transition duration-200 transform"
                            />
                            <span class="text-tb-black ml-2">{{
                                item.name
                            }}</span>
                        </span>
                    </div>
                    <transition name="fade">
                        <div
                            v-if="accordionActive[index]"
                            class="accordion-content overflow-y-hidden"
                            :style="`height: ${
                                8 +
                                (item.filter.length > 8
                                    ? 256
                                    : 28 * item.filter.length)
                            }px;`"
                        >
                            <div class="content-wrapper py-1 w-full">
                                <div
                                    class="
                                        overflow-y-auto
                                        nice-scroll
                                        pl-4
                                        mr-5
                                    "
                                    :style="`height: ${
                                        item.filter.length > 8
                                            ? 256
                                            : 28 * item.filter.length
                                    }px;`"
                                >
                                    <label
                                        v-for="(element, key) in item.filter"
                                        :key="key"
                                        class="
                                            category-check-item
                                            flex
                                            items-center
                                            my-1
                                        "
                                    >
                                        <input
                                            type="checkbox"
                                            name="manufacturer"
                                            class="
                                                form-checkbox
                                                rounded-full
                                                border-transparent
                                            "
                                            :value="element.url"
                                            v-model="checkedFilter[index]"
                                            @change="handleCheckedChange"
                                            id
                                        />
                                        <span class="text-tb-blue text-sm ml-4"
                                            >{{ element.name }} ({{
                                                element.anzahl
                                            }})</span
                                        >
                                    </label>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "vue-slider-component/theme/default.css";

export default {
    name: "FilterSidebar",
    props: {
        filters: {
            default: {},
        },
        priceRange: {
            default: {
                min: 0,
                max: 5000,
                // value: [],
            },
        },
    },
    data() {
        return {
            priceRangeOptions: {
                tooltip: "none",
                style: {
                    "border-width": "6px",
                    "border-color": "#3099F2",
                    "box-shadow": "none",
                },
            },
            priceRangeObjectValue: [this.priceRange.min, this.priceRange.max],
            holdChange: null,
            accordionActive: [],
            checkedFilter: [],
            priceAccordionActive: true,
            filtersArray: [],
            slidePriceRange: {
                min: this.priceRange.min,
                max: this.priceRange.max,
            },
            filterTags: [],
        };
    },
    watch: {
        filters: {
            deep: true,
            immediate: false,
            handler: function () {
                this.updateFilterData();
            },
        },
        priceRange(newValue, oldValue) {
            if (newValue.min != oldValue.min || newValue.max != oldValue.max) {
                if (newValue.min < this.priceRangeObjectValue[1]) {
                    this.slidePriceRange.min = newValue.min;
                    this.$set(this.priceRangeObjectValue, 0, newValue.min);
                } else {
                    this.$set(this.priceRangeObjectValue, 0, newValue.min);
                    this.slidePriceRange.min = newValue.min;
                }
                if (newValue.max > this.priceRangeObjectValue[1]) {
                    this.slidePriceRange.max = newValue.max;
                    this.$set(this.priceRangeObjectValue, 1, newValue.max);
                } else {
                    this.$set(this.priceRangeObjectValue, 1, newValue.max);
                    this.slidePriceRange.max = newValue.max;
                }
            }
        },
    },
    created() {
        this.updateFilterData();
    },
    beforeDestroy() {
        clearInterval(this.holdChange);
    },
    methods: {
        clearErrorMsg() {
            if (this.priceRangeObjectValue[0] < this.priceRange.min) {
                this.priceRangeObjectValue[0] = this.priceRange.min;
                this.handleMouseUp();
            }
            if (this.priceRangeObjectValue[1] < this.priceRange.min) {
                this.priceRangeObjectValue[1] = this.priceRange.min;
                this.handleMouseUp();
            }
            if (this.priceRangeObjectValue[0] > this.priceRange.max) {
                this.priceRangeObjectValue[0] = this.priceRange.max;
                this.handleMouseUp();
            }
            if (this.priceRangeObjectValue[1] > this.priceRange.max) {
                this.priceRangeObjectValue[1] = this.priceRange.max;
                this.handleMouseUp();
            }
        },
        priceRangeByController(value, index) {
            this.$set(
                this.priceRangeObjectValue,
                index,
                parseInt(this.priceRangeObjectValue[index]) + parseInt(value)
            );
            this.clearErrorMsg();
        },
        handleMouseDown(value, index) {
            this.priceRangeByController(value, index);
            let delayCount = 0;
            this.holdChange = setInterval(() => {
                delayCount++;
                if (delayCount > 2) {
                    this.priceRangeByController(value, index);
                }
            }, 300);
        },
        handleMouseUp() {
            clearInterval(this.holdChange);
            this.$emit("applyPriceRange", this.priceRangeObjectValue);
        },
        handleCheckedChange() {
            let producerParam = "";
            let filterParam = "";
            for (let index = 0; index < this.checkedFilter.length; index++) {
                const element = this.checkedFilter[index];
                for (let key = 0; key < element.length; key++) {
                    const item = element[key];
                    if (this.filtersArray[index].name == "Hersteller") {
                        producerParam = `${item}`;
                    } else {
                        filterParam += `${
                            filterParam.length ? "-" : ""
                        }${item}`;
                    }
                }
            }
            let pathStr =
                "/" +
                this.$route.params.categoryId +
                "/" +
                (producerParam && producerParam + "/") +
                filterParam;
            this.$router.push({ path: pathStr });
        },
        updateFilterData() {
            this.filterTags = [];
            this.accordionActive = [];
            this.checkedFilter = [];
            this.priceAccordionActive = true;
            this.filtersArray = [];
            if (this.filters.hs) {
                this.accordionActive.push(true);
                let checkedArr = [];
                let subFilterArr = [];
                for (const index in this.filters.hs.filter) {
                    if (
                        Object.hasOwnProperty.call(
                            this.filters.hs.filter,
                            index
                        )
                    ) {
                        const item = this.filters.hs.filter[index];
                        if (item.anzahl > 0) subFilterArr.push(item);
                        if (item.apply) {
                            checkedArr.push(item.url);
                            this.filterTags.push({
                                key: 0,
                                index: checkedArr.length - 1,
                                item,
                            });
                        }
                    }
                }
                this.filtersArray.push({
                    name: this.filters.hs.name,
                    filter: subFilterArr,
                });

                this.checkedFilter.push(checkedArr);
            }
            for (const key in this.filters) {
                if (Object.hasOwnProperty.call(this.filters, key)) {
                    if (key == "hs") continue;
                    const element = this.filters[key];
                    this.accordionActive.push(key == "hs" ? true : false);
                    let checkedArr = [];
                    let subFilterArr = [];
                    for (const index in element.filter) {
                        if (Object.hasOwnProperty.call(element.filter, index)) {
                            const item = element.filter[index];
                            if (item.anzahl > 0) subFilterArr.push(item);
                            if (item.apply) {
                                checkedArr.push(item.url);
                                this.filterTags.push({
                                    key: this.checkedFilter.length - 0,
                                    index: checkedArr.length - 1,
                                    item,
                                });
                                this.accordionActive[
                                    this.accordionActive.length - 1
                                ] = true;
                            }
                        }
                    }
                    this.filtersArray.push({
                        name: element.name,
                        filter: subFilterArr,
                    });
                    this.checkedFilter.push(checkedArr);
                }
            }
        },
		handleTagRemove(element) {
			let tempArr = this.checkedFilter[element.key];
			tempArr.splice(element.index, 1);
			this.checkedFilter[element.key] = tempArr;
			this.handleCheckedChange()
		},
		handleClearAll() {
			this.checkedFilter = [];
			this.handleCheckedChange();
		}
    },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: 0.4s;
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    height: 0 !important;
}
.price-range-input {
    width: 45%;
}
.reload-icon img {
    transform-origin: 100% 50%;
    height: 17px;
    width: 17px;
}
.h-72 {
    height: 288px;
}
</style>
