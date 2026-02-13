import { memories } from '@/lib/memories-data';
import Image from 'next/image';

export function ImagePreloader() {
  return (
    <div className="absolute left-[-9999px] top-[-9999px]">
      {memories.map((mem) => (
        <Image
          key={mem.id}
          src={mem.imageUrl}
          width={400}
          height={600}
          alt=""
          priority
        />
      ))}
    </div>
  );
}
