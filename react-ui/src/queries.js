import { gql } from '@apollo/client'

export const GET_DATA_FOR_DATE = gql`
  query getDataForDate($onDate: String!) {
    allOrderCount: orderCount(onDate: $onDate)
    allVaccineCount: vaccineCount(onDate: $onDate)
    allVaccinesUsed: vaccinesUsed(onDate: $onDate)
    allVaccinesExpired: vaccinesExpiredBeforeUsage(onDate: $onDate)
    allVaccinesExpiringWithinTenDays: vaccinesExpiringWithinTenDays(onDate: $onDate)
    allVaccinesLeft: vaccinesLeft(onDate: $onDate)
    antiquaOrderCount: orderCount(onDate: $onDate, manufacturer: "Antiqua")
    antiquaVaccineCount: vaccineCount(onDate: $onDate, manufacturer: "Antiqua")
    antiquaVaccinesUsed: vaccinesUsed(onDate: $onDate, manufacturer: "Antiqua")
    antiquaExpired: vaccinesExpiredBeforeUsage(onDate: $onDate, manufacturer: "Antiqua")
    antiquaExpiringWithinTenDays: vaccinesExpiringWithinTenDays(onDate: $onDate, manufacturer: "Antiqua")
    antiquaVaccinesLeft: vaccinesLeft(onDate: $onDate, manufacturer: "Antiqua")
    sbOrderCount: orderCount(onDate: $onDate, manufacturer: "SolarBuddhica")
    sbVaccineCount: vaccineCount(onDate: $onDate, manufacturer: "SolarBuddhica")
    sbVaccinesUsed: vaccinesUsed(onDate: $onDate, manufacturer: "SolarBuddhica")
    sbExpired: vaccinesExpiredBeforeUsage(onDate: $onDate, manufacturer: "SolarBuddhica")
    sbExpiringWithinTenDays: vaccinesExpiringWithinTenDays(onDate: $onDate, manufacturer: "SolarBuddhica")
    sbVaccinesLeft: vaccinesLeft(onDate: $onDate, manufacturer: "SolarBuddhica")
    zerpfyOrderCount: orderCount(onDate: $onDate, manufacturer: "Zerpfy")
    zerpfyVaccineCount: vaccineCount(onDate: $onDate, manufacturer: "Zerpfy")
    zerpfyVaccinesUsed: vaccinesUsed(onDate: $onDate, manufacturer: "Zerpfy")
    zerpfyExpired: vaccinesExpiredBeforeUsage(onDate: $onDate, manufacturer: "Zerpfy")
    zerpfyExpiringWithinTenDays: vaccinesExpiringWithinTenDays(onDate: $onDate, manufacturer: "Zerpfy")
    zerpfyVaccinesLeft: vaccinesLeft(onDate: $onDate, manufacturer: "Zerpfy")
  }
`;