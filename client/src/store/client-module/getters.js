export function mobileDetect () {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
}

export function iosDetect () {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function iPadDetect () {
  return /iPad|iPod/i.test(navigator.userAgent)
}

export function iphoneDetect () {
  return /iPhone/i.test(navigator.userAgent)
}

export function getLangPr (state) {
  return state.langPr
}

export function getToken (state) { return state.token }

export function getVisibleColumnsResident () {
  return [
    'id',
    'name',
    'surname',
    'direction_code',
    'citizenship',
    'certificate_number',
    'actions'
  ]
}

export function getAllColumnsResident () {
  return [
    'id',
    'place_of_education',
    'direction_code',
    'name',
    'surname',
    'father_name',
    'date_of_birth',
    'direction',
    'citizenship',
    'client_requisite',
    'residential_address',
    'school_region',
    'school_district',
    'school_number_or_name',
    'graduation_year',
    'education_language',
    'certificate_number',
    'act_number',
    'phone',
    'created_at'
  ]
}

export function getVisibleColumnsNonResident () {
  return [
    'id',
    'name',
    'surname',
    'direction_code',
    'citizenship',
    'certificate_number',
    'actions'
  ]
}

export function getAllColumnsNonResident () {
  return [
    'id',
    'place_of_education',
    'direction_code',
    'name',
    'surname',
    'father_name',
    'date_of_birth',
    'direction',
    'citizenship',
    'client_requisite',
    'residential_address',
    'education_language',
    'phone',
    'created_at'
  ]
}
export function getMainData (state) {
  return state.mainData
}

export function getThumbStyle () {
  return {
    right: '2px',
    borderRadius: '5px',
    backgroundColor: 'teal',
    width: '6px',
    opacity: 0.75,
    zIndex: 99999
  }
}
