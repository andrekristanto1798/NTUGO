const OPP_HALL_10_11 = { name: 'Opp. Hall 10 & 11', position: { latitude: 1.354668, longitude: 103.687445 } };
const OPP_HALL_8 = { name: 'Opp. Hall 8', position: { latitude: 1.350511, longitude: 103.68588 } };
const OPP_HALL_2 = { name: 'Hall 6, Opp. Hall 2', position: { latitude: 1.347303, longitude: 103.686575 } };
const OPP_HALL_4 = { name: 'Opp. Hall 4', position: { latitude: 1.343637, longitude: 103.686739 } };
const OPP_INNOV_CENTRE = { name: 'Opp. Innovation Centre', position: { latitude: 1.341891, longitude: 103.683863 } };
const OPP_SPMS = { name: 'Opp. SPMS', position: { latitude: 1.341843, longitude: 103.681094 } };
const OPP_WKWSCI = { name: 'Opp. WKWSCI', position: { latitude: 1.341983, longitude: 103.679056 } };
const OPP_CEE = { name: 'Opp. CEE', position: { latitude: 1.345862, longitude: 103.678414 } };
const OPP_LWN = { name: 'NIE, Opp. LWN Library', position: { latitude: 1.347969, longitude: 103.68024 } };
const OPP_HALL_3 = { name: 'Opp. Hall 3 & 16', position: { latitude: 1.350485, longitude: 103.68038 } };
const OPP_HALL_14 = { name: 'Opp. Hall 14 & 15', position: { latitude: 1.353155, longitude: 103.681656 } };
const OPP_HALL_TAMARIND = {
  name: 'Opp. Nanyang Crescent Hall',
  position: { latitude: 1.354785, longitude: 103.683856 },
};

const EDGE_OPP_LWN_OPP_HALL_3 = {
  start: OPP_LWN,
  end: OPP_HALL_3,
  distance: 400,
  edge_id: 386629
}

const EDGE_OPP_HALL_3_OPP_HALL_14 = {
  start: OPP_HALL_3,
  end: OPP_HALL_14,
  distance: 400,
  edge_id: 386630
}

const EDGE_OPP_HALL_14_OPP_HALL_TAMARIND = {
  start: OPP_HALL_14,
  end: OPP_HALL_TAMARIND,
  distance: 350,
  edge_id: 386790
}

const EDGE_OPP_HALL_TAMARIND_OPP_HALL_10_11 = {
  start: OPP_HALL_TAMARIND,
  end: OPP_HALL_10_11,
  distance: 500,
  edge_id: 386791
}

const EDGE_OPP_HALL_10_11_HALL_8 = {
  start: OPP_HALL_10_11,
  end: OPP_HALL_8,
  distance: 550,
  edge_id: 386632
}

const EDGE_OPP_HALL_8_OPP_HALL_2 = {
  start: OPP_HALL_8,
  end: OPP_HALL_2,
  distance: 450,
  edge_id: 386633
}

const EDGE_OPP_HALL_2_OPP_HALL_4 = {
  start: OPP_HALL_2,
  end: OPP_HALL_4,
  distance: 750,
  edge_id: 386634
}

const EDGE_OPP_HALL_4_OPP_INNOV_CENTRE = {
  start: OPP_HALL_4,
  end: OPP_INNOV_CENTRE,
  distance: 400,
  edge_id: 386635
}

const EDGE_OPP_INNOV_CENTRE_OPP_SPMS = {
  start: OPP_INNOV_CENTRE,
  end: OPP_SPMS,
  distance: 500,
  edge_id: 386636
}

const EDGE_OPP_SPMS_OPP_WKWSCI = {
  start: OPP_SPMS,
  end: OPP_WKWSCI,
  distance: 350,
  edge_id: 386637
}

const EDGE_OPP_WKWSCI_OPP_CEE = {
  start: OPP_WKWSCI,
  end: OPP_CEE,
  distance: 500,
  edge_id: 386638
}

const EDGE_OPP_CEE_OPP_LWN = {
  start: OPP_CEE,
  end: OPP_LWN,
  distance: 400,
  edge_id: 386651
}

export const BLUE_BUS_STOP_LIST = [
  OPP_HALL_10_11,
  OPP_HALL_8,
  OPP_HALL_2,
  OPP_HALL_4,
  OPP_INNOV_CENTRE,
  OPP_SPMS,
  OPP_WKWSCI,
  OPP_CEE,
  OPP_LWN,
  OPP_HALL_3,
  OPP_HALL_14,
  OPP_HALL_TAMARIND,
];

export const BLUE_EDGE_LIST = [
  EDGE_OPP_LWN_OPP_HALL_3,
  EDGE_OPP_HALL_3_OPP_HALL_14,
  EDGE_OPP_HALL_14_OPP_HALL_TAMARIND,
  EDGE_OPP_HALL_TAMARIND_OPP_HALL_10_11,
  EDGE_OPP_HALL_10_11_HALL_8,
  EDGE_OPP_HALL_8_OPP_HALL_2,
  EDGE_OPP_HALL_2_OPP_HALL_4,
  EDGE_OPP_HALL_4_OPP_INNOV_CENTRE,
  EDGE_OPP_INNOV_CENTRE_OPP_SPMS,
  EDGE_OPP_SPMS_OPP_WKWSCI,
  EDGE_OPP_WKWSCI_OPP_CEE,
  EDGE_OPP_CEE_OPP_LWN,
]
