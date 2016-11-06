/*******************************************************************************
 * Copyright (c) 2009, 2016 Mountainminds GmbH & Co. KG and Contributors
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Marc R. Hoffmann - initial API and implementation
 *
 *******************************************************************************/

import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.Date;

import org.jacoco.core.data.ExecutionData;
import org.jacoco.core.data.ExecutionDataReader;
import org.jacoco.core.data.IExecutionDataVisitor;
import org.jacoco.core.data.ISessionInfoVisitor;
import org.jacoco.core.data.SessionInfo;

/**
 * This example reads execution data files given as program arguments and dumps
 * their content.
 */
public final class ExecDump {

    private final PrintStream out;

    Double percentage;
    Long totalHits = 0L;
    Long totalLines = 0L;

    String filter = null;

    /**
     * Creates a new example instance printing to the given stream.
     *
     * @param out stream for outputs
     */
    public ExecDump(final PrintStream out) {
        this.out = out;
    }

    /**
     * Run this example with the given parameters.
     *
     * @param args command line parameters
     * @throws IOException in case of error reading a input file
     */
    public void execute(final String[] args) throws IOException {
        String file = "target/jacoco.exec";
        this.filter = args.length > 0 ? args[0] : null;
        dump(file);
        out.printf("TOTAL: %3d of %3d \n", this.totalHits, this.totalLines);
        Double percentage = new Double(this.totalHits) * 100 / this.totalLines;
        out.printf("%3.2f%% cobertura\n", percentage);
    }

    private void dump(final String file) throws IOException {
        out.printf("exec file: %s%n", file);
        out.println("CLASS ID         HITS/PROBES   CLASS NAME");

        final FileInputStream in = new FileInputStream(file);
        final ExecutionDataReader reader = new ExecutionDataReader(in);
        reader.setSessionInfoVisitor(new ISessionInfoVisitor() {
            public void visitSessionInfo(final SessionInfo info) {
                out.printf("Session \"%s\": %s - %s%n", info.getId(), new Date(
                                info.getStartTimeStamp()),
                        new Date(info.getDumpTimeStamp()));
            }
        });
        reader.setExecutionDataVisitor(new IExecutionDataVisitor() {
            public void visitClassExecution(final ExecutionData data) {
                if (filter == null || data.getName().contains(filter)) {

                    out.printf("%016x  %3d of %3d   %s%n",
                            Long.valueOf(data.getId()),
                            Integer.valueOf(getHitCount(data.getProbes())),
                            Integer.valueOf(data.getProbes().length),
                            data.getName());
                    totalHits += Long.valueOf(getHitCount(data.getProbes()));
                    totalLines += Long.valueOf(data.getProbes().length);
                }
            }
        });
        reader.read();
        in.close();
        out.println();
    }

    private int getHitCount(final boolean[] data) {
        int count = 0;
        for (final boolean hit : data) {
            if (hit) {
                count++;
            }
        }
        return count;
    }

    /**
     * Entry point to run this examples as a Java application.
     *
     * @param args list of program arguments
     * @throws IOException in case of errors executing the example
     */
    public static void main(final String[] args) throws IOException {
        new ExecDump(System.out).execute(args);
    }
}
