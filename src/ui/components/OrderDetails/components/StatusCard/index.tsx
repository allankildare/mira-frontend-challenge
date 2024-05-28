interface StatusCardProps {
  type: 'pending' | 'confirmed' | 'rejected'
}

const statusData = {
  pending: {
    value: 'Reviewing',
    bgColor: '#e0ba31',
    color: '#202020'
  },
  confirmed: {
    value: 'Confirmed',
    bgColor: '#34c970',
    color: '#202020'
  },
  rejected: {
    value: 'Rejected',
    bgColor: '#c7362c',
    color: '#fafafa'
  },
}
export function StatusCard(props: StatusCardProps) {
  const { type } = props
  return (
    <div className="rounded px-2 py-1 inline-block" style={{ backgroundColor: statusData[type].bgColor, color: statusData[type].color }}>
      {statusData[type].value}
    </div>
  )
}
