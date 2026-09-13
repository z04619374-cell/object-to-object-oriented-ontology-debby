# Object to Object-Oriented Ontology — Design Specification

## Intent

Create a single-page interactive digital artwork for a university Creative Practice presentation. The work initially frames Debby, a Jellycat giraffe, as a travelling subject, then complicates that reading by exposing the human decisions, machine records, and unstable memories behind each photograph.

The work does not answer whether Object-Oriented Ontology is correct. Its unresolved question is whether an object's apparent perspective is discovered or projected.

## Narrative

The interaction follows one continuous route:

1. `OBJECT / TO / OBJECT-ORIENTED ONTOLOGY` and “Whose journey is this?”
2. A restrained journey viewer showing one photograph, place, date, and a short sentence.
3. Clicking the image offers `OPEN THIS MEMORY` without navigation.
4. Each `CONTINUE` reveals one persistent textual perspective in order: `DEBBY`, `PHOTOGRAPHER`, `CAMERA`, `MEMORY`.
5. Once all four perspectives are visible, the reader may open a cold metadata panel.
6. `NEXT JOURNEY` advances to the next record. Previous journeys remain reachable.
7. After the final record, the work ends on “Was any of it mine?”, “You tell me.”, and the central question, with a working `RESTART` control.

There is no title-deconstruction sequence, `OOO` persona, `DOUBT` persona, audio, voice-over, ambient sound, traditional navigation, about page, contact page, or decorative interaction.

## Visual System

- Black background, white and muted-grey text, hairline borders, and a few flat geometric lines/circles.
- Travel images are greyscale and never styled as a cute commercial gallery.
- Typography supplies the hierarchy: soft serif text for Debby, direct sans serif for Photographer and Memory, monospace for Camera and metadata.
- Early states have large quiet fields. Revealed perspectives increase textual density while preserving legibility.
- Motion is limited to opacity, short vertical shifts, panel expansion, and crossfades. Reduced-motion preferences disable nonessential transitions.
- Desktop uses an offset two-column composition. Mobile becomes a single vertical flow with controls kept comfortably tappable.

## Architecture and Data

Use React with Vite and plain CSS. `src/data/journeys.js` exports every editable journey record, including image path, place, date, caption, the four perspective texts, and metadata. Presentation components consume this data and do not duplicate narrative content.

An explicit reducer controls the experience phases and prevents invalid transitions. Components remain focused: intro, journey frame, memory prompt, perspective stack, metadata panel, ending, and geometric background.

Image placeholders are local SVG compositions clearly intended for replacement. They must not fabricate realistic photographs or make factual claims about Debby's travels.

## Accessibility and Verification

- Semantic headings, buttons, dialog labelling, descriptive image alt text, visible focus states, Escape-to-close metadata, and focus management.
- Automated tests cover beginning, memory opening, ordered perspective reveal, metadata, journey navigation, ending, and restart.
- Production build and lint must succeed.
- Browser QA covers the complete interaction at desktop and mobile widths, console health, keyboard use, and every control.
