<template>
  <div class="project">
    <h3 style="margin: 10px">{{t('DCFTitle')}}</h3>
    <div class="form-item">
      <div class="switch__title">{{t('Period')}}</div>
      <div class="switch">
        <div :class="isFiveYearPeriod ? 'item' : 'item selected'" @click="switchToThreeYearView">{{t('Period3')}}</div>
        <div :class="isFiveYearPeriod ? 'item selected' : 'item'" @click="switchToFiveYearView">{{t('Period5')}}</div>
      </div>
    </div>
    <div class="form-item">
      <div class="switch__title">{{t('CashFlowCalculation')}}</div>
      <div class="switch">
        <div :class="useAutoCashFlowCalulation ? 'item' : 'item selected'" @click="switchToManualInput">{{t('Manual')}}</div>
        <div :class="useAutoCashFlowCalulation ? 'item selected' : 'item'" @click="switchToAutoCalculation">{{t('Auto')}}</div>
      </div>
    </div>
    <div
      v-if="useAutoCashFlowCalulation"
      class="dcf-container"
    >
      <div class="form-item currency">
        <div class="label">{{t('FirstYearCashflow')}}</div>
        <input type="number" v-model="firstYearCashFlow" inputmode="decimal" />
      </div>
      <div class="form-item percentage-input">
        <div class="label">{{t('CashflowGrowthRate')}}</div>
        <input type="number" v-model="cashFlowGrothRate" inputmode="decimal" />
      </div>
      <div class="form-item percentage-input">
        <div class="label">{{t('DiscountRate')}}</div>
        <input type="number" v-model="discountRate" inputmode="decimal" />
      </div>
      <div class="form-item percentage-input">
        <div class="label">{{t('GrowthRate')}}</div>
        <input type="number" v-model="growthRate" inputmode="decimal" />
      </div>
      <div class="calculate-button" @click="calculate">{{t('Calculate')}}</div>
      <div class="form-item currency"> 
        <div class="label">{{t('ReasonablePrice')}}</div>
        <div class="result">{{resonablePrice}}</div>
      </div>
    </div>
    <div v-else :class="`dcf-container${isFiveYearPeriod ? ' dcf-container__five-year-view' : ''}`">
      <div class="form-item currency">
        <div class="label">{{t('FirstYearCashflow')}}</div>
        <input type="number" v-model="firstYearCashFlow" inputmode="decimal" />
      </div>
      <div class="form-item currency">
        <div class="label">{{t('SecondYearCashflow')}}</div>
        <input type="number" v-model="secondYearCashFlow" inputmode="decimal" />
      </div>
      <div class="form-item currency">
        <div class="label">{{t('ThirdYearCashflow')}}</div>
        <input type="number" v-model="thirdYearCashFlow" inputmode="decimal" />
      </div>
      <div v-if="isFiveYearPeriod" class="form-item currency">
        <div class="label">{{t('ForthYearCashflow')}}</div>
        <input type="number" v-model="forthYearCashFlow" inputmode="decimal" />
      </div>
      <div v-if="isFiveYearPeriod" class="form-item currency">
        <div class="label">{{t('FifthYearCashflow')}}</div>
        <input type="number" v-model="fifthYearCashFlow" inputmode="decimal" />
      </div>
      <div class="form-item percentage-input">
        <div class="label">{{t('DiscountRate')}}</div>
        <input type="number" v-model="discountRate" inputmode="decimal" />
      </div>
      <div class="form-item percentage-input">
        <div class="label">{{t('GrowthRate')}}</div>
        <input type="number" v-model="growthRate" inputmode="decimal" />
      </div>
      <div class="calculate-button" @click="calculate">{{t('Calculate')}}</div>
      <div class="form-item currency"> 
        <div class="label">{{t('ReasonablePrice')}}</div>
        <div class="result">{{resonablePrice}}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.project {
  padding-top: 60px;
  position: absolute;
  width: 100vw;
  padding-bottom: 20px;

  @media screen and (max-width: 375px) {
    padding-top: 0px;
  }

  .form-item {
    text-align: start;
    width: 100%;
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .result {
    color: #0f1123;
    line-height: 40px;
    font-size: 16px;
    width: 35%;
  }

  .label {
    line-height: 30px;
    width: 65%;
  }

  .form-content {
    width: 35%;
  }

  .switch {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 50%;
    padding-right: 20px;

    .item {
      padding: 10px;
      background: white;
      color: black;
      border-radius: 4px;
      cursor: pointer;
    }

    .selected {
      background: #eb596e;
      color: white;
    }

    &__title {
      font-size: 16px;
      line-height: 40px;
      width: 50%;
      padding-left: 20px;
    }
  }

  .dcf-container {
    display: flex;
    padding: 0 20px;
    flex-direction: column;

    input {
      line-height: 28px;
      font-size: 16px;
      width: 35%;
    }

    .calculate-button {
      background: #eb596e;
      color: white;
      font-size: 20px;
      width: 100%;
      line-height: 40px;
      cursor: pointer;
      margin-top: 10px;
      border-radius: 4px;
    }

    .currency {
      &::after {
        content: '¥';
        padding-left: 10px;
        font-size: 16px;
        line-height: 30px;
      }
    }

    .percentage-input {
      &::after {
        content: '%';
        padding-left: 5px;
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const en: {
  [key: string]: string;
} = {
  DCFTitle : 'DCF calculator',
  Period: 'Period',
  Period3: '3 Years',
  Period5: '5 Years',
  CashFlowCalculation: 'CashFlow Grow',
  Manual: 'Manual',
  Auto: 'Auto',
  FirstYearCashflow: 'First year cashflow',
  SecondYearCashflow: 'Second year cashflow',
  ThirdYearCashflow: 'Third year cashflow',
  ForthYearCashflow: 'Forth year cashflow',
  FifthYearCashflow: 'Fifth year cashflow',
  CashflowGrowthRate: 'Cashflow growth rate',
  DiscountRate: 'Discount rate(Interest rate)',
  GrowthRate: 'Growth rate',
  Calculate: 'Calculate',
  ReasonablePrice: 'Reasonable price',
};

const zh: {
  [key: string]: string;
} = {
  DCFTitle : 'DCF 计算器',
  Period: '周期',
  Period3: '3年',
  Period5: '5年',
  CashFlowCalculation: '每股收益计算',
  Manual: '手动',
  Auto: '自动',
  FirstYearCashflow: '第一年每股收益',
  SecondYearCashflow: '第二年每股收益',
  ThirdYearCashflow: '第三年每股收益',
  ForthYearCashflow: '第四年每股收益',
  FifthYearCashflow: '第五年每股收益',
  CashflowGrowthRate: '每股收益增长率',
  DiscountRate: '内含报酬率',
  GrowthRate: '净利润永续增长率',
  Calculate: '计算',
  ReasonablePrice: '合理价位',
};

@Component
export default class Project extends Vue {
  resonablePrice: number = 0;
  firstYearCashFlow: (number | string) = '';
  secondYearCashFlow: (number | string) = '';
  thirdYearCashFlow: (number | string) = '';
  forthYearCashFlow: (number | string) = '';
  fifthYearCashFlow: (number | string) = '';
  cashFlowGrothRate: (number | string) = '';
  discountRate: number = 8;
  growthRate: number = 5;
  isFiveYearPeriod: boolean = true;
  useAutoCashFlowCalulation: boolean = true;
  isChinese: boolean = navigator.language.includes('zh');

  switchToAutoCalculation() {
    this.useAutoCashFlowCalulation = true;
  }

  switchToManualInput() {
    this.useAutoCashFlowCalulation = false;
  }

  switchToThreeYearView() {
    this.isFiveYearPeriod = false;
  }

  switchToFiveYearView() {
    this.isFiveYearPeriod = true;
  }

  t(key: string) {
    if (this.isChinese) {
      return zh[key];
    }
    return en[key];
  }

  calculate() {
    if (!this.firstYearCashFlow) {
      return;
    }
    window.scrollTo(0,document.body.scrollHeight);
    try {
      let cfs: Array<(number | string)> = [];
      if (this.useAutoCashFlowCalulation) {
        const compoundCashflowRate = Number(this.cashFlowGrothRate) / 100 + 1;
        const yearCount = this.isFiveYearPeriod ? 5 : 3;
        for (let i = 0; i < yearCount; i++) {
          cfs.push(Number(this.firstYearCashFlow ) * Math.pow(compoundCashflowRate, i));
        }
      } else if (this.secondYearCashFlow && this.thirdYearCashFlow) {
        if (this.isFiveYearPeriod) {
          cfs = [
            this.firstYearCashFlow,
            this.secondYearCashFlow,
            this.thirdYearCashFlow,
            this.forthYearCashFlow,
            this.fifthYearCashFlow,
          ];
        } else {
          cfs = [this.firstYearCashFlow, this.secondYearCashFlow, this.thirdYearCashFlow];
        }
      }
      let res = 0;
      const length = cfs.length;
      const discountRatePercent = this.discountRate / 100;
      const compoundRate = 1 + discountRatePercent;
      const growthRatePercent = this.growthRate / 100;
      cfs.forEach((c: (string | number), index) => {
        res += Number(c) / Math.pow(compoundRate, index);
      });
      res += ((cfs[length - 1] as number) / (discountRatePercent - growthRatePercent)) / Math.pow(compoundRate, length);

      this.resonablePrice = Number(res.toFixed(2));
    } catch (e) {
      console.error(e);
    }
  }
}
</script>