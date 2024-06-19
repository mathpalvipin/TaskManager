import { AvatarComponent } from 'avatar-initials';

export default function UserLogo({name}) {
    const userName = name.split(' ');
    const firstName= userName[0];
    const lastName = userName[1];
  // ...
  return (
    <div className={`w-10 h-10 flex self-center items-center justify-between relative`}>
    
        <AvatarComponent
          classes="rounded-full"
          useGravatar={false}
          size={44}
          color="#000000"
          background="#f1f1f1"
          fontSize={16}
          fontWeight={400}
          offsetY={24}
          initials={`${firstName[0]}${lastName[0]}`}
        />
     
    </div>
  );
}