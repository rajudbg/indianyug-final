'use client'

import React, { useState, useEffect, useMemo, Fragment } from 'react'
import parse, { domToReact, HTMLReactParserOptions, Element } from 'html-react-parser'
import { WordPressPost } from '@/types/wordpress'
import { RelatedPostCard } from './related-post-card'

interface RelatedPostsInjectorProps {
  content: string
  relatedPosts: WordPressPost[]
  maxInlineRelated?: number
}

export function RelatedPostsInjector({ 
  content, 
  relatedPosts, 
  maxInlineRelated = 2 
}: RelatedPostsInjectorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const elements = useMemo(() => {
    if (!isMounted || !relatedPosts.length) {
      return null;
    }

    let pCount = 0;
    let injectedCount = 0;
    const injectionPoints = [
      Math.floor(content.split('</p>').length * 0.4),
      Math.floor(content.split('</p>').length * 0.7)
    ];

    const options: HTMLReactParserOptions = {
      replace: (domNode) => {
        if (domNode instanceof Element && domNode.tagName === 'p') {
          pCount++;
          
          if (injectedCount < maxInlineRelated && injectionPoints.includes(pCount)) {
            const post = relatedPosts[injectedCount];
            injectedCount++;
            
            return (
              <Fragment>
                <p {...domNode.attribs}>
                  {domToReact(domNode.children, options)}
                </p>
                <RelatedPostCard post={post} />
              </Fragment>
            );
          }
        }
      },
    };

    return parse(content, options);
  }, [isMounted, content, relatedPosts, maxInlineRelated]);

  if (!isMounted) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return <>{elements}</>;
}
