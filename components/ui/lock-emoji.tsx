import Image from 'next/image';

export const LockEmoji = ({ width = 60, height = 60 }) => {
  return (
    <Image
      src="https://cdn-0.emojis.wiki/emoji-pics-lf/apple/locked-with-key-apple.webp"
      width={width}
      height={height}
      alt="Закрытый замок с ключом"
    />
  );
};
