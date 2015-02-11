#!/bin/bash

ls ../app/images/icons/ | xargs -I{} echo '<input id="'{}'" type="checkbox" />
<label for="'{}'" style="background-image: url(/app/images/icons/'{}');"></label>'

