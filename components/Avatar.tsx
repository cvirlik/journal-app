import { Svg, Circle, Defs, Image, ClipPath } from 'react-native-svg';
import type { ImageRequireSource } from 'react-native';
import React from 'react';

type AvatarProps = {
  size: number;
  cxyr: number;
  image: ImageRequireSource;
};

export function Avatar(props: AvatarProps) {
  const { size, cxyr, image } = props;

  return (
    <Svg height={size} width={size}>
      <Circle cx={cxyr} cy={cxyr} r={cxyr} fill="pink" />
      <Image
        href={image}
        x={0}
        y={0}
        width={size}
        height={size}
        clipPath="url(#clip)"
        preserveAspectRatio="xMidYMid slice"
      />
      <Defs>
        <ClipPath id="clip">
          <Circle cx={cxyr} cy={cxyr} r={cxyr} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
