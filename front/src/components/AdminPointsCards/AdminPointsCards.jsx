import AdminPoint from './AdminPointsCard.jsx';

export default function AdminPointsCards({ className }) {
  const points = [
    {
      id: 1,
      companyName: 'Nombre compania',
      address: '124, Calle, Ciudad, País.',
      postalCode: '4462',
      contactEmail: 'empresa@correo.com',
      contactTel: '+57 38 4394-4321',
      image:
        'https://img.freepik.com/foto-gratis/puestos-fruta-fresca-mercado-san-miguel_53876-146829.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1709078400&semt=sph',
    },
    {
      id: 2,
      companyName: 'Nombre compania',
      address: '124, Calle, Ciudad, País.',
      postalCode: '4462',
      contactEmail: 'empresa@correo.com',
      contactTel: '+57 38 4394-4321',
      image:
        'https://img.freepik.com/foto-gratis/puestos-fruta-fresca-mercado-san-miguel_53876-146829.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1709078400&semt=sph',
    },
    {
      id: 3,
      companyName: 'Nombre compania',
      address: '124, Calle, Ciudad, País.',
      postalCode: '4462',
      contactEmail: 'empresa@correo.com',
      contactTel: '+57 38 4394-4321',
      image:
        'https://img.freepik.com/foto-gratis/puestos-fruta-fresca-mercado-san-miguel_53876-146829.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1709078400&semt=sph',
    },
  ];

  return (
    <div className={className}>
      {points.map((point) => {
        return (
          <AdminPoint
            className='my-2'
            key={point.id}
            image={point.image}
            companyName={point.companyName}
            address={point.address}
            postalCode={point.postalCode}
            contactEmail={point.contactEmail}
            contactTel={point.contactTel}
          />
        );
      })}
    </div>
  );
}
