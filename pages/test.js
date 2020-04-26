import React from "react";
import Link from "next/link";
import { Button } from "semantic-ui-react";

export default function test() {
  return (
    <>
      <div>Test page</div>
      <Link href="/" prefetch>
        <Button>Go back</Button>
      </Link>
    </>
  );
}
