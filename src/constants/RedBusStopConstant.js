const HALL_12 = {
  position: {
    latitude: 1.351932,
    longitude: 103.680606,
  },
  name: 'Hall 12',
};

const LWN = {
  position: {
    latitude: 1.347973,
    longitude: 103.680514,
  },
  name: 'Canteen A & Lee Wee Nam Library / Opposite NIE',
};

const SBS = {
  position: {
    latitude: 1.344602,
    longitude: 103.678669,
  },
  name: 'School of Biological Sciences',
};

const WKW = {
  position: {
    latitude: 1.342081,
    longitude: 103.67923,
  },
  name: 'Wee Kim Wee School',
};

const HALL_7 = {
  position: {
    latitude: 1.339987,
    longitude: 103.680895,
  },
  name: 'Hall of Residence 7',
};

const INNOVATION_CENTRE = {
  position: {
    latitude: 1.342293,
    longitude: 103.683725,
  },
  name: 'Innovation Centre, Canteen B & Chinese Heritage Centre',
};

const HALL_4 = {
  position: {
    latitude: 1.34384,
    longitude: 103.686866,
  },
  name: 'Hall of Residence 4',
};

const HALL_1 = {
  position: {
    latitude: 1.345696,
    longitude: 103.68781,
  },
  name: 'Hall of Residence 1',
};

const CANTEEN_2 = {
  position: {
    latitude: 1.349064,
    longitude: 103.685385,
  },
  name: 'Canteen 2',
};

const HALL_9 = {
  position: {
    latitude: 1.351526,
    longitude: 103.685696,
  },
  name: 'Opposite Nanyang Heights / Hall of Residence 9',
};

const HALL_10 = {
  position: {
    latitude: 1.354343,
    longitude: 103.686858,
  },
  name: 'Hall of Residence 10 & 11',
};

const HALL_11 = {
  position: {
    latitude: 1.355866,
    longitude: 103.68611,
  },
  name: 'Graduate Hall / Hall of Residence 11',
};

const TAMARIND_HALL = {
  position: {
    latitude: 1.35495,
    longitude: 103.684439,
  },
  name: 'Nanyang Crescent Halls',
};

const MOCK_RED_BUS_1 = {
  position: {
    latitude: 1.352646,
    longitude: 103.681145,
  },
  bearing: -45,
  speed: 10,
};

const MOCK_RED_BUS_2 = {
  position: {
    latitude: 1.348959,
    longitude: 103.681905,
  },
  bearing: -45,
  speed: 10,
};

const MOCK_RED_BUS_3 = {
  position: {
    latitude: 1.347868,
    longitude: 103.680291,
  },
  bearing: -45,
  speed: 10,
};

const EDGE_HALL_12_LWN = {
  start: HALL_12,
  end: LWN,
  distance: 670,
  edge_id: 386653
}

const EDGE_LWN_SBS = {
  start: LWN,
  end: SBS,
  distance: 350,
  edge_id: 386619
}

const EDGE_SBS_WKW = {
  start: SBS,
  end: WKW,
  distance: 500,
  edge_id: 386620
}

const EDGE_WKW_HALL_7 = {
  start: WKW,
  end: HALL_7,
  distance: 400,
  edge_id: 386621
}

const EDGE_HALL_7_INNOVATION_CENTRE = {
  start: HALL_7,
  end: INNOVATION_CENTRE,
  distance: 500,
  edge_id: 386622
}

const EDGE_INNOVATION_CENTRE_HALL_4 = {
  start: INNOVATION_CENTRE,
  end: HALL_4,
  distance: 450,
  edge_id: 386623
}

const EDGE_HALL_4_HALL_1 = {
  start: HALL_4,
  end: HALL_1,
  distance: 300,
  edge_id: 386624
}

const EDGE_HALL_1_CANTEEN_2 = {
  start: HALL_1,
  end: CANTEEN_2,
  distance: 280,
  edge_id: 386625
}

const EDGE_CANTEEN_2_HALL_9 = {
  start: CANTEEN_2,
  end: HALL_9,
  distance: 550,
  edge_id: 386626
}

const EDGE_HALL_9_HALL_10 = {
  start: HALL_9,
  end: HALL_10,
  distance: 350,
  edge_id: 386792
}

const EDGE_HALL_10_HALL_11 = {
  start: HALL_10,
  end: HALL_11,
  distance: 400,
  edge_id: 386793
}

const EDGE_HALL_11_TAMARIND_HALL = {
  start: HALL_11,
  end: TAMARIND_HALL,
  distance: 550,
  edge_id: 386794
}

const EDGE_TAMARIND_HALL_HALL_12 = {
  start: TAMARIND_HALL,
  end: HALL_12,
  distance: 210,
  edge_id: 386795
}

export const RED_BUS_LIST = [MOCK_RED_BUS_1, MOCK_RED_BUS_2, MOCK_RED_BUS_3];
export const RED_BUS_STOP_LIST = [
  HALL_12,
  LWN,
  SBS,
  WKW,
  HALL_7,
  INNOVATION_CENTRE,
  HALL_4,
  HALL_1,
  CANTEEN_2,
  HALL_9,
  HALL_10,
  HALL_11,
  TAMARIND_HALL,
];
export const RED_EDGE_LIST = [
  EDGE_HALL_12_LWN,
  EDGE_LWN_SBS,
  EDGE_SBS_WKW,
  EDGE_WKW_HALL_7,
  EDGE_HALL_7_INNOVATION_CENTRE,
  EDGE_INNOVATION_CENTRE_HALL_4,
  EDGE_HALL_4_HALL_1,
  EDGE_HALL_1_CANTEEN_2,
  EDGE_CANTEEN_2_HALL_9,
  EDGE_HALL_9_HALL_10,
  EDGE_HALL_10_HALL_11,
  EDGE_HALL_11_TAMARIND_HALL,
  EDGE_TAMARIND_HALL_HALL_12,
]
