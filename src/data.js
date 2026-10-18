export const initialAlerts = [
  { id: 'DR-104', type: 'Attendance', centre: 'Pune Skills Hub', centreId: 'MH-04', room: 'Room 2', batch: 'A12', priority: 'Medium', status: 'Pending review', reason: 'Minimum apparent attendance gap: 1', time: '10:42 AM', date: '18 Oct 2026', detail: 'The attendance reference is higher than the conservative CCTV occupancy estimate. This is a potential discrepancy and requires authorised review.', reference: 24, observed: 20, margin: 3 },
  { id: 'DR-105', type: 'Infrastructure', centre: 'Nashik Training Centre', centreId: 'MH-08', room: 'Workshop 2', batch: 'W06', priority: 'High', status: 'Pending review', reason: 'Equipment not seen in two valid checks', time: '10:18 AM', date: '18 Oct 2026', detail: 'A required equipment slot was not detected in two consecutive valid clear-view checks. Physical verification is recommended.', reference: 10, observed: 8, margin: 0 },
  { id: 'DR-106', type: 'Camera', centre: 'Thane Technical Institute', centreId: 'MH-03', room: 'Room 1', batch: 'C02', priority: 'High', status: 'Technical issue', reason: 'Camera feed unavailable', time: '09:56 AM', date: '18 Oct 2026', detail: 'The camera has not provided usable frames. Attendance and infrastructure conclusions for the affected period are not available.', reference: null, observed: null, margin: null },
  { id: 'DR-107', type: 'Activity', centre: 'Kolhapur Skills Centre', centreId: 'MH-02', room: 'Tailoring Lab', batch: 'T04', priority: 'Medium', status: 'Recheck required', reason: 'Repeated low-activity observations', time: '09:20 AM', date: '18 Oct 2026', detail: 'Three consecutive eligible clips had activity-cue measurements below the configured threshold. This does not establish equipment failure.', reference: null, observed: null, margin: null },
  { id: 'DR-108', type: 'Infrastructure', centre: 'Pune Skills Hub', centreId: 'MH-04', room: 'Workshop 1', batch: 'E03', priority: 'Low', status: 'Pending review', reason: 'Training board slot is blocked', time: 'Yesterday', date: '17 Oct 2026', detail: 'The equipment slot was obscured in the camera view. The item should not be treated as missing based on this observation.', reference: 12, observed: 10, margin: 0 },
]
export const occupancyData = [
  { time: '09:00', occupancy: 18, reference: 24 }, { time: '09:15', occupancy: 20, reference: 24 },
  { time: '09:30', occupancy: 21, reference: 24 }, { time: '09:45', occupancy: 19, reference: 24 },
  { time: '10:00', occupancy: 20, reference: 24 }, { time: '10:15', occupancy: 20, reference: 24 },
  { time: '10:30', occupancy: 22, reference: 24 }, { time: '10:45', occupancy: 21, reference: 24 },
]
export const centreData = [
  { id: 'MH-01', name: 'Mumbai Central Skill Hub', district: 'Mumbai', rooms: 8, cameras: '8 / 8', alerts: 1, status: 'Healthy' },
  { id: 'MH-02', name: 'Kolhapur Skills Centre', district: 'Kolhapur', rooms: 6, cameras: '6 / 6', alerts: 2, status: 'Review needed' },
  { id: 'MH-03', name: 'Thane Technical Institute', district: 'Thane', rooms: 5, cameras: '4 / 5', alerts: 3, status: 'Camera issue' },
  { id: 'MH-04', name: 'Pune Skills Hub', district: 'Pune', rooms: 9, cameras: '9 / 9', alerts: 4, status: 'Review needed' },
  { id: 'MH-08', name: 'Nashik Training Centre', district: 'Nashik', rooms: 7, cameras: '7 / 7', alerts: 2, status: 'Review needed' },
]
export const equipmentData = [
  { slot: 'WB-01', name: 'Work bench', expected: 1, state: 'Seen', checked: '10:30 AM', confidence: '96%' },
  { slot: 'SM-02', name: 'Sewing machine', expected: 1, state: 'Seen', checked: '10:30 AM', confidence: '94%' },
  { slot: 'SM-03', name: 'Sewing machine', expected: 1, state: 'Blocked', checked: '10:30 AM', confidence: '—' },
  { slot: 'SM-04', name: 'Sewing machine', expected: 1, state: 'Not seen · clear view', checked: '10:30 AM', confidence: '—' },
  { slot: 'SM-05', name: 'Sewing machine', expected: 1, state: 'Unable to verify', checked: '10:30 AM', confidence: '—' },
  { slot: 'WB-06', name: 'Work bench', expected: 1, state: 'Seen', checked: '10:30 AM', confidence: '91%' },
]
